<template>
  <h1 id="header">Transmission line simulation</h1>
  <div id="container">
    <div id="parameters-form">
      <ParametersForm :process="process" />
      <button @click="stop">Stop</button>
    </div>
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
/* #header {
  padding: 1rem;
  margin: 0%;
} */

#container {
  width: 60%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

#simulation {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

#wave-chart-left,
#wave-chart-right {
  flex: 1;
}
</style>
