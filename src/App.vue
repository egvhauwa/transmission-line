<template>
  <div id="header">
    <div class="container">
      <h1>Transmission line simulation</h1>
    </div>
  </div>
  <div class="container">
    <ParametersForm :process="process" :stop="stop" />
    <div id="simulation">
      <div id="wave-chart-left">
        <WaveChart :data="voltage" />
      </div>
      <div id="wave-chart-right">
        <WaveChart :data="current" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { InputParams, Simulator } from './utils/simulator';

import ParametersForm from './components/ParametersForm.vue';
import WaveChart from './components/WaveChart.vue';

import './assets/styles/container.css';

const simulator: Simulator = new Simulator();
const interval = ref<number | null>(null);

const voltage = ref(<number[]>simulator.V);
const current = ref(<number[]>simulator.I);

const process = (parameters: InputParams) => {
  // Clear interval
  if (interval.value) {
    clearInterval(interval.value);
  }
  // Set parameters
  simulator.setParameters({ ...parameters }); // spread operator to avoid live update of parameters
  // Set interval
  interval.value = setInterval(() => {
    simulator.updateTimeStep();
    voltage.value = [...simulator.V];
    current.value = [...simulator.I];
  }, 20); // Update every 20 ms
};

const stop = () => {
  if (interval.value) {
    clearInterval(interval.value);
  }
};
</script>

<style scoped>
#header {
  width: 100%;
  padding: 1.5rem 0;
  background-color: #1a1a1a;
}

#header h1 {
  margin: 0;
  color: white;
}

#simulation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

#wave-chart-left,
#wave-chart-right {
  flex: 1 1 300px; /* This is the key change */
  min-width: 300px; /* Minimum width before wrapping */
}
</style>
