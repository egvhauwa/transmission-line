<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
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
  width: 100%;
  height: 100%;
}

canvas {
  max-width: 100% !important;
}
</style>
