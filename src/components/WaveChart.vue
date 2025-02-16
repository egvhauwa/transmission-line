<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

import { Chart } from 'chart.js';

const props = defineProps({ data: Array });

let chart = null;
const chartRef = ref(null);

const data = {
  labels: props.data.map((_, index) => index),
  datasets: [
    {
      label: 'label',
      data: props.data,
      pointRadius: 0,
      borderColor: '#2196f3',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
    },
  ],
};
const config = {
  type: 'line',
  data: data,
  options: {
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    title: {
      display: true,
      text: 'title',
    },
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            suggestedMin: -1,
            suggestedMax: 2,
          },
        },
      ],
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
  width: 100%;
  height: 100%;
}

canvas {
  max-width: 100% !important;
}
</style>
