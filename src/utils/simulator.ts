import { generator, getMinimumWavelength } from './generator';

export interface InputParams {
  Rc: number; // Characteristic impedance (Ohms)
  v: number; // Signal speed (m/s)
  d: number; // Line length (m)
  Rg: number; // Generator impedance (Ohms)u
  Rl: number; // Load impedance (Ohms)
  Cl: number; // Load capacitance (nF)
  A: number; // Signal amplitude (V)
  tBit: number; // Bit duration (s)
  tRise: number; // Rise time (s)
}

export const defaultParameters = {
  Rc: 50,
  v: 2e8,
  d: 10,
  Rg: 50,
  Rl: 1000,
  Cl: 0,
  A: 1,
  tBit: 1e-8,
  tRise: 1e-9,
};

export interface Results {
  Kl: number; // Reflection coefficient at the load
  Kg: number; // Reflection coefficient at the generator
  vswr: number; // Voltage Standing Wave Ratio
  L: number; // Line length in wavelengths
}

export class Simulator {
  private parameters: InputParams = defaultParameters;

  private minWaveLength: number;
  private N: number; // Location steps
  private deltaZ: number; // Location step size
  private deltaT: number; // Time step size
  private alpha: number; // Courant factor
  private timeStep: number; // Current time step

  public V: number[]; // Voltage
  public I: number[]; // Current

  constructor() {
    this.initialize();
  }

  initialize(): void {
    const { v, d, tRise } = this.parameters;

    // delta z <= min wavelength / 10 to avoid dispersion
    this.minWaveLength = getMinimumWavelength(v, tRise);
    this.N = Math.ceil(d / (this.minWaveLength / 20));

    this.deltaZ = d / this.N;
    this.deltaT = this.deltaZ / v; // Courant limit
    this.alpha = (v * this.deltaT) / this.deltaZ; // Courant factor
    this.timeStep = 0;

    this.V = Array(this.N + 1).fill(0);
    this.I = Array(this.N).fill(0);
  }

  setParameters(parameters: InputParams): void {
    this.parameters = parameters;
    this.initialize();
  }

  calculateResults(): Results {
    const { Rc, Rg, Rl, d } = this.parameters;

    const Kl = (Rl - Rc) / (Rl + Rc);
    const Kg = (Rg - Rc) / (Rg + Rc);
    const vswr = (1 + Kl) / (1 - Kl);
    const L = d / this.minWaveLength;
    return {
      Kl,
      Kg,
      vswr,
      L,
    };
  }

  updateTimeStep(): void {
    const { Rc, Rg, Rl, Cl, A, tBit, tRise } = this.parameters;
    const { deltaT, alpha, N, timeStep } = this;
    let { I, V } = this;

    // n = 0
    const Eg =
      (generator((timeStep - 1) * deltaT, A, tBit, tRise) +
        generator(timeStep * deltaT, A, tBit, tRise)) /
      2;
    I[0] = I[0] + alpha * (V[0] - V[1]);
    if (Rg === 0) {
      // Ideal voltage source
      V[0] = Eg;
    } else {
      // Boundary condition for n=0
      V[0] =
        (V[0] + 2 * alpha * Rc * (Eg / Rg - V[0] / (2 * Rg) - I[0] / Rc)) /
        (1 + (alpha * Rc) / Rg);
    }

    // n = 1...N-1
    for (let n = 1; n < N; n++) {
      // Update equation for I
      I[n] = I[n] + alpha * (V[n] - V[n + 1]);
      // Update equation for V
      V[n] = V[n] + alpha * (I[n - 1] - I[n]);
    }

    // n = N
    if (Rl === 0) {
      // Short-circuited load
      V[N] = 0;
    } else {
      // Boundary condition for n=N
      V[N] =
        (V[N] * (1 + (2 * alpha * Cl * Rc) / deltaT - (alpha * Rc) / Rl) +
          2 * alpha * I[N - 1]) /
        (1 + (alpha * Rc) / Rl + (2 * alpha * Cl * Rc) / deltaT);
    }
    this.timeStep = timeStep + 1;
  }
}
