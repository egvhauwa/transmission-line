// utils/bit.ts

export function egTijd(t: number, A: number, Tbit: number, tau_r: number): number {
    const tau_h = Tbit;

    if (t < tau_r && t > 0) {
        return (A / tau_r) * t;
    } else if (t >= tau_r && t <= tau_h) {
        return A;
    } else if (t > tau_h && t < tau_h + tau_r) {
        return (-A / tau_r) * t + (A * (tau_r + tau_h)) / tau_r;
    } else {
        return 0;
    }
}
