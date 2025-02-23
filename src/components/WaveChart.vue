<template>
  <div class="chart-container">
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { Chart, registerables } from 'chart.js';
import type { ChartData, ChartConfiguration } from 'chart.js';

Chart.register(...registerables);

const props = defineProps<{
  title: string;
  xaxisTitle: string;
  data: number[];
  amplitude: number;
  length: number;
}>();

let chart: Chart | null = null;
const chartRef = ref<HTMLCanvasElement | null>(null);

const data: ChartData = {
  labels: props.data.map(
    (_, index) => (index / (props.data.length - 1)) * props.length
  ),
  datasets: [
    {
      label: 'label',
      data: props.data,
      fill: true,
      borderColor: '#2196f3',
      backgroundColor: 'rgba(33, 150, 243, 0.2)',
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
        text: props.title,
        color: '#000000',
        font: {
          size: 16,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: props.xaxisTitle,
        },
        type: 'linear',
        min: 0,
        max: props.length,
      },
      y: {
        suggestedMin: -props.amplitude,
        suggestedMax: 2 * props.amplitude,
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
    chart.data.labels = newData.map(
      (_, index) => (index / (newData.length - 1)) * props.length
    );
    chart.update('none');
  }
);

watch(
  () => props.amplitude,
  (newAmplitude) => {
    if (!chart?.options?.scales?.y) {
      return;
    }
    chart.options.scales.y.suggestedMin = -newAmplitude;
    chart.options.scales.y.suggestedMax = 2 * newAmplitude;
    chart.update('none');
  }
);

watch(
  () => props.length,
  (newLength) => {
    if (!chart?.options?.scales?.x) {
      return;
    }
    chart.options.scales.x.max = newLength;
    chart.update('none');
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
  max-height: 100% !important;
}
</style>
