// utils/bit.ts

export function egTijd(
  t: number,
  A: number,
  Tbit: number,
  tau_r: number
): number {
  if (t < tau_r && t > 0) {
    // Linear rise
    return (A / tau_r) * t;
  } else if (t >= tau_r && t <= Tbit) {
    // Stable high
    return A;
  } else if (t > Tbit && t < Tbit + tau_r) {
    // Linear fall
    return (-A / tau_r) * t + (A * (tau_r + Tbit)) / tau_r;
  } else {
    return 0;
  }
}
