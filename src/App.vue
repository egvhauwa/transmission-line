<template>
  <div id="header">
    <div class="container">
      <h1>Transmission line simulation</h1>
    </div>
  </div>
  <div class="container">
    <ParametersForm :process="process" :stop="stop" />
    <div id="simulation">
      <div class="wave-chart card">
        <WaveChart :data="voltage" />
      </div>
      <div class="smith-chart card">
        <SmithChart />
      </div>
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
  padding: 1.25rem 0;
  background-color: #1a1a1a;
}

#header h1 {
  margin: 0;
  color: white;
}

@media (min-width: 850px) {
  #simulation {
    display: flex;
    gap: 1rem;
  }

  .wave-chart {
    flex: 2;
    aspect-ratio: 2 / 1;
  }

  .smith-chart {
    flex: 1;
    aspect-ratio: 1 / 1;
  }
}

@media (max-width: 849px) {
  #simulation {
    flex-direction: column;
  }

  .wave-chart {
    aspect-ratio: 2 / 1;
    margin-bottom: 1rem;
  }

  .smith-chart {
    aspect-ratio: 1 / 1;
    width: max(50%, 250px);
    margin: auto;
  }
}

.card {
  background: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

#results-table {
  margin-top: 1rem;
  width: 100%;
}
</style>
