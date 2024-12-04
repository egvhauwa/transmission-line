// utils/leapfrog.ts
import { egTijd } from "./egTijd";

export interface InputParams {
  Rc: number; // Characteristic impedance (Ohms)
  v: number; // Signal speed (m/s)
  d: number; // Line length (m)
  Rg: number; // Generator impedance (Ohms)
  Rl: number; // Load impedance (Ohms)
  Cl: number; // Load capacitance (nF)
  A: number; // Signal amplitude (V)
  Tbit: number; // Bit duration (s)
  tau_r: number; // Rise time (s)
}

export interface SimulationResult {
  V: number[][]; // Voltage matrix
  I: number[][]; // Current matrix
}

export function leapfrog(
  M: number,
  N: number,
  input: InputParams
): SimulationResult {
  // M = 1000, N = 300
  const { Rc, v, d, Rg, Rl, Cl, A, Tbit, tau_r } = input;

  const z = d / N; // Space steps
  console.log(z);
  const t = z / v; // Time steps, courant limit
  console.log(t);
  const alpha = (v * t) / z; // Courant factor
  console.log(alpha);

  const V: number[][] = Array.from({ length: M + 1 }, () =>
    Array(N + 1).fill(0)
  );
  const I: number[][] = Array.from({ length: M }, () => Array(N).fill(0));

  for (let m = 0; m < M; m++) {
    for (let n = 0; n <= N; n++) {
      if (n === 0) {
        const Eg = egTijd((m + 0.5) * t, A, Tbit, tau_r);
        if (m === 0) {
          I[0][0] = 0;
        } else {
          I[m][0] = I[m - 1][0] + alpha * (V[m][0] - V[m][1]);
        }
        if (Rg === 0) {
          // Ideal voltage source
          V[m + 1][0] = Eg;
        } else {
          // Boundary condition for n=0
          V[m + 1][0] =
            (V[m][0] +
              2 *
                alpha *
                ((Eg * Rc) / Rg - ((V[m][0] / 2) * Rc) / Rg - I[m][0])) /
            (1 + (alpha * Rc) / Rg);
        }
      } else if (n === N) {
        if (Rl === 0) {
          // Short-circuited load
          V[m + 1][n] = 0;
        } else {
          // Boundary condition for n=N
          V[m + 1][n] =
            (V[m][n] * (1 + (2 * alpha * Cl * Rc) / t - (alpha * Rc) / Rl) +
              2 * alpha * I[m][n - 1]) /
            (1 + (alpha * Rc) / Rl + (2 * alpha * Cl * Rc) / t);
        }
      } else {
        if (m === 0) {
          I[m][n] = 0;
        } else {
          // Update equation for I
          I[m][n] = I[m - 1][n] + alpha * (V[m][n] - V[m][n + 1]);
        }
        // Update equation for V
        V[m + 1][n] = V[m][n] + alpha * (I[m][n - 1] - I[m][n]);
      }
    }
  }
  return { V, I };
}
