// utils/generator.ts

const getMaximumFrequency = (tRise: number): number => {
  return 1 / (Math.PI * tRise);
};

export const getMinimumWavelength = (v: number, tRise: number): number => {
  return v / getMaximumFrequency(tRise);
};

export const generator = (
  t: number,
  A: number,
  tBit: number,
  tRise: number
): number => {
  if (t < tRise && t > 0) {
    // Linear rise
    return (A / tRise) * t;
  } else if (t >= tRise && t <= tBit) {
    // Stable high
    return A;
  } else if (t > tBit && t < tBit + tRise) {
    // Linear fall
    return (-A / tRise) * t + (A * (tRise + tBit)) / tRise;
  } else {
    return 0;
  }
};
