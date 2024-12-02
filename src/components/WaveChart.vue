<template>
  <div>
    <canvas ref="chartRef" width="700" height="450"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

import { Chart, registerables } from "chart.js";
import type { ChartConfiguration } from "chart.js";

Chart.register(...registerables);

const props = defineProps<{ data: number[] }>();

let chart: Chart | null = null;
const chartRef = ref(null);

const data = {
  labels: props.data.map((_, index) => index),
  datasets: [
    {
      label: "label",
      data: props.data,
    },
  ],
};
const config = {
  type: "line",
  data: data,
  options: {
    animation: false,
    // responsive: true,
    elements: {
      point: {
        pointStyle: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "title",
      },
      legend: {
        display: false,
      },
    },
  },
};

onMounted(() => {
  if (!chartRef.value) {
    return;
  }
  const ctx = (chartRef.value as HTMLCanvasElement).getContext("2d");
  if (!ctx) {
    return;
  }
  chart = new Chart(ctx, config as ChartConfiguration);
});

watch(
  () => props.data,
  (newData) => {
    if (!chart) {
      return;
    }
    console.log(newData);
    chart.data.datasets[0].data = newData;
    chart.update();
  }
);
</script>

<style scoped>
/* Add any styling you need */
canvas {
  max-width: 100%;
  height: auto;
}
</style>
