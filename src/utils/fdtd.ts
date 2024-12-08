// utils/leapfrog.ts
import { generator, getMinimumWavelength } from "./generator";

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

export interface SimulationResult {
  V: number[][]; // Voltage
  I: number[][]; // Current
}

export const getMinimumLocations = (
  d: number,
  v: number,
  tRise: number
): number => {
  const minWaveLength = getMinimumWavelength(v, tRise);
  // delta z <= min wavelength / 10 to avoid dispersion
  return Math.ceil(d / (minWaveLength / 10));
};

export const update = (
  M: number,
  N: number,
  input: InputParams
): SimulationResult => {
  // M = 1000, N = 300
  const { Rc, v, d, Rg, Rl, Cl, A, tBit, tRise } = input;

  // const lambda = 1/

  const z = d / N; // Space steps
  const t = z / v; // Time steps, courant limit
  const alpha = (v * t) / z; // Courant factor

  console.log(`space step: ${z}`);
  console.log(`Courant factor: ${alpha}`);

  const V: number[][] = Array.from({ length: M + 1 }, () =>
    Array(N + 1).fill(0)
  );
  const I: number[][] = Array.from({ length: M }, () => Array(N).fill(0));

  for (let m = 1; m < M; m++) {
    // n = 0
    const Eg = generator((m - 0.5) * t, A, tBit, tRise);
    I[m][0] = I[m - 1][0] + alpha * (V[m][0] - V[m][1]);
    if (Rg === 0) {
      // Ideal voltage source
      V[m + 1][0] = Eg;
    } else {
      // Boundary condition for n=0
      V[m + 1][0] =
        (V[m][0] +
          2 * alpha * Rc * (Eg / Rg - V[m][0] / (2 * Rg) - I[m][0] / Rc)) /
        (1 + (alpha * Rc) / Rg);
    }

    // n = 1...N-1
    for (let n = 1; n < N; n++) {
      // Update equation for I
      I[m][n] = I[m - 1][n] + alpha * (V[m][n] - V[m][n + 1]);
      // Update equation for V
      V[m + 1][n] = V[m][n] + alpha * (I[m][n - 1] - I[m][n]);
    }

    // n = N
    if (Rl === 0) {
      // Short-circuited load
      V[m + 1][N] = 0;
    } else {
      // Boundary condition for n=N
      V[m + 1][N] =
        (V[m][N] + 2 * alpha * Rc * (I[m][N - 1] / Rc - V[m][N] / (2 * Rl))) /
        (1 + (alpha * Rc) / Rl);

      // V[m + 1][N] =
      //   (V[m][N] * (1 + (2 * alpha * Cl * Rc) / t - (alpha * Rc) / Rl) +
      //     2 * alpha * I[m][N - 1]) /
      //   (1 + (alpha * Rc) / Rl + (2 * alpha * Cl * Rc) / t);
    }
  }
  return { V, I };
};
