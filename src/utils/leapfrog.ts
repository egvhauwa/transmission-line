// utils/leapfrog.ts
import { egTijd } from "./egTijd";

export interface InputParams {
    Rc: number;  // Characteristic impedance (Ohms)
    v: number;   // Signal speed (m/s)
    d: number;   // Line length (m)
    Rg: number;  // Generator impedance (Ohms)
    Rl: number;  // Load impedance (Ohms)
    Cl: number;  // Load capacitance (nF)
    A: number;   // Signal amplitude (V)
    Tbit: number; // Bit duration (s)
    tau_r: number; // Rise time (s)
}

export interface SimulationResult {
    V: number[][]; // Voltage matrix
    I: number[][]; // Current matrix
}

export function leapfrog2(M: number, N: number, input: InputParams): SimulationResult {
    const { Rc, v, d, Rg, Rl, Cl, A, Tbit, tau_r } = input;

    const z = d / N; // Space steps
    const t = z / v; // Time steps
    const alpha = v * t / z;

    const V: number[][] = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
    const I: number[][] = Array.from({ length: M }, () => Array(N).fill(0));

    for (let m = 0; m < M; m++) {
        for (let n = 0; n <= N; n++) {
            if (n === 0) {
                const Eg = egTijd((m - 0.5) * t, A, Tbit, tau_r);
                if (m === 0) {
                    I[m][n] = 0;
                } else {
                    I[m][n] = I[m - 1][n] + alpha * (V[m][n] - V[m][n + 1]);
                }
                V[m + 1][n] =
                    (V[m][n] +
                        2 * alpha * (Eg * Rc / Rg - (V[m][n] / 2) * Rc / Rg - I[m][n])) /
                    (1 + alpha * Rc / Rg);
            } else if (n === N) {
                V[m + 1][n] =
                    (V[m][n] * (1 + 2 * alpha * Cl * Rc / t - alpha * Rc / Rl) +
                        2 * alpha * I[m][n - 1]) /
                    (1 + alpha * Rc / Rl + 2 * alpha * Cl * Rc / t);
            } else {
                if (m === 0) {
                    I[m][n] = 0;
                } else {
                    I[m][n] = I[m - 1][n] + alpha * (V[m][n] - V[m][n + 1]);
                }
                V[m + 1][n] = V[m][n] + alpha * (I[m][n - 1] - I[m][n]);
            }
        }
    }    
    return { V, I };
}

export function leapfrog(N: number, M: number, input: InputParams): SimulationResult {
    const { Rc, v, d, Rg, Rl, Cl, A, Tbit, tau_r } = input;

    const z = d / N; // Space steps
    const t = z / v; // Time steps
    const alpha = v * t / z;

    const V: number[][] = Array.from({ length: N + 1 }, () => Array(M + 1).fill(0));
    const I: number[][] = Array.from({ length: N }, () => Array(M).fill(0));

    for (let m = 0; m < M; m++) {
        for (let n = 0; n <= N; n++) {
            if (n === 0) {
                const Eg = egTijd((m - 0.5) * t, A, Tbit, tau_r);
                if (m === 0) {
                    I[n][m] = 0;
                } else {
                    I[n][m] = I[n][m - 1] + alpha * (V[n][m] - V[n + 1][m]);
                }
                V[n][m + 1] =
                    (V[n][m] +
                        2 * alpha * (Eg * Rc / Rg - (V[n][m] / 2) * Rc / Rg - I[n][m])) /
                    (1 + alpha * Rc / Rg);
            } else if (n === N) {
                V[n][m + 1] =
                    (V[n][m] * (1 + 2 * alpha * Cl * Rc / t - alpha * Rc / Rl) +
                        2 * alpha * I[n - 1][m]) /
                    (1 + alpha * Rc / Rl + 2 * alpha * Cl * Rc / t);
            } else {
                if (m === 0) {
                    I[n][m] = 0;
                } else {
                    I[n][m] = I[n][m - 1] + alpha * (V[n][m] - V[n + 1][m]);
                }
                V[n][m + 1] = V[n][m] + alpha * (I[n - 1][m] - I[n][m]);
            }
        }
    }
    return { V, I };
}
