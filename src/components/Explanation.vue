<template>
  <div class="explanatory-text">
    <h2>About the Simulation</h2>
    <p>
      This simulation models the behavior of voltage and current signals on a
      transmission line using the Time-Domain Transmission Line (TDTD) method.
      The FDTD method relies on a leapfrom scheme both in space and in time.
    </p>

    <p>
      The load consists of a resistive part in parallel to a capacitance. For
      the calculation of the reflection coefficient at the load shown in the
      table, only the resistive part is considered.
    </p>

    <p>
      The generator produces a single bit with equal rise time 𝜏<sub>r</sub> and
      fall time 𝜏<sub>f</sub>. The high-frequency content of a single bit is
      primarily due to the rise and fall time of the pulse. The bandwidth is
      defined as <code>BW = 1 / (π𝜏<sub>r</sub>)</code>. This bandwidth can be
      seen as the maximum frequency that is present in the spectrum of the
      signal.
    </p>

    <p>The space step Δz</p>

    <h3>Practical Insights</h3>
    <p>
      <strong>High-Speed Digital Systems:</strong> Short rise and fall times in
      modern systems increase susceptibility to reflections and mismatched
      impedance. Ensure proper termination with
      <code>Z<sub>L</sub> ≈ Z<sub>0</sub></code
      >.
    </p>
    <p>
      <strong>Signal Integrity:</strong> Monitor how impedance mismatches and
      rise times impact signal quality, especially at high bit rates.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
