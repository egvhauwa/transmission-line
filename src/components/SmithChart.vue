<template>
  <div class="chart-container">
    <div class="chart">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import { Chart } from 'chart.js';
import { SmithChart } from 'chartjs-chart-smith';

// const props = defineProps<{ data: number[] }>();

let chart = null;
const chartRef = ref(null);

const data = {
  datasets: [
    {
      label: 'label',
      data: [{ real: 0.5, imag: 1 }],
    },
  ],
};

const config = {
  type: 'smith',
  data: data,
  options: {
    title: {
      display: true,
      text: 'title',
    },
    legend: {
      display: false,
    },
  },
};

onMounted(() => {
  if (!chartRef.value) {
    return;
  }
  const ctx = chartRef.value.getContext('2d');
  if (!ctx) {
    return;
  }
  chart = new Chart(ctx, config);
});
</script>

<style scoped>
.chart-container {
  position: relative;
  padding-top: 100%; /* Maintain aspect ratio of 1:1 */
}

.chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
