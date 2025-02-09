<template>
  <div id="header">
    <div class="container">
      <h1>Transmission line simulation</h1>
    </div>
  </div>
  <div class="container">
    <ParametersForm :process="process" :stop="stop" />
    <div id="simulation">
      <div class="wave-chart">
        <WaveChart :data="voltage" />
      </div>
      <div class="wave-chart">
        <WaveChart :data="current" />
      </div>
    </div>
    <div id="smith-chart">
      <SmithChart />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { InputParams, Simulator } from './utils/simulator';

import ParametersForm from './components/ParametersForm.vue';
// @ts-ignore
import WaveChart from './components/WaveChart.vue';
// @ts-ignore
import SmithChart from './components/SmithChart.vue';

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
  align-items: stretch;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
}

.wave-chart {
  flex: 1.77 1 auto;
  min-width: 300px;
}

#smith-chart {
  flex: 1 1 auto;
  min-width: 200px;
  max-width: 500px;
}
</style>
