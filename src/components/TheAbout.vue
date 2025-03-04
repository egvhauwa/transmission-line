<template>
  <div>
    <h2>About the Simulation</h2>
    <p>
      This simulation models the behavior of voltage and current signals on a
      transmission line using the Finite Difference Time Domain (FDTD) method.
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
      defined as BW = 1 / (π𝜏<sub>r</sub>). This bandwidth can be seen as the
      maximum frequency that is present in the spectrum of the signal.
    </p>

    <p>
      The space step Δz must be chosen sufficiently small to resolve all wave
      phenoma. A general rule of thumb is: Δz ≤ λ<sub>min</sub> / 10. For this
      simulator Δz = λ<sub>min</sub> / 20 was, chosen, with a lower bound of 10
      and an upper bound of 1000 (to limit CPU usage). λ<sub>min</sub>
      corresponds to maximum frequency of the signal. For the time step, the
      maximum allowed value Δt = Δz / v is used. This is called the Courant
      limit. A higher time step renders the simulations unstable and non-causal.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
