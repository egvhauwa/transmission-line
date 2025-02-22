<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Parameter</th>
          <th>Magnitude</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>K<sub>load</sub></td>
          <td>{{ props.results.Kl.toFixed(2) }}</td>
          <td>Reflection coefficient at the load</td>
        </tr>
        <tr>
          <td>K<sub>gen</sub></td>
          <td>{{ props.results.Kg.toFixed(2) }}</td>
          <td>Reflection coefficient at the generator</td>
        </tr>
        <tr>
          <td>VSWR</td>
          <td>{{ props.results.vswr.toFixed(2) }}</td>
          <td>Voltage Standing Wave Ratio</td>
        </tr>
        <tr>
          <td>L</td>
          <td>{{ props.results.L.toFixed(2) }} λ</td>
          <td>Line length in wavelengths</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Results } from '../utils/simulator';

const props = defineProps<{
  results: Results;
}>();
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th {
  font-weight: bold;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f0f0f0;
}
</style>
