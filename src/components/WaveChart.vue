<template>
  <div class="chart-container">
    <div class="chart">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { Chart, registerables } from 'chart.js';
import type { ChartData, ChartConfiguration } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{ data: number[] }>();

let chart: Chart | null = null;
const chartRef = ref<HTMLCanvasElement | null>(null);

const data: ChartData = {
  labels: props.data.map((_, index) => index),
  datasets: [
    {
      label: 'label',
      data: props.data,
    },
  ],
};
const config: ChartConfiguration = {
  type: 'line',
  data: data,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    elements: {
      point: {
        pointStyle: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'title',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        suggestedMin: -1,
        suggestedMax: 2,
      },
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

watch(
  () => props.data,
  (newData) => {
    if (!chart) {
      return;
    }
    chart.data.datasets[0].data = newData;
    chart.update();
  }
);
</script>

<style scoped>
.chart-container {
  position: relative;
  padding-top: 56.25%; /* Maintain aspect ratio of 16:9 */
}

.chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
