<template>
  <div id="header">
    <div class="container">
      <h1>Transmission Line Simulator</h1>
    </div>
  </div>
  <div class="container">
    <ParametersForm
      v-model="parameters"
      :simulate="simulate"
      :start="start"
      :stop="stop"
    />
    <div id="simulation">
      <div class="wave-chart card">
        <WaveChart
          title="Voltage"
          xaxisTitle="Transmission Line Position (m)"
          :data="voltage"
          :amplitude="parameters.A"
          :length="parameters.d"
        />
      </div>
      <div class="wave-chart card">
        <WaveChart
          title="Current (x Characteristic Impedance)"
          xaxisTitle="Transmission Line Position (m)"
          :data="current"
          :amplitude="parameters.A"
          :length="parameters.d"
        />
      </div>
    </div>
    <ResultsTable class="results-table card" :results="results" />
    <Explanation id="explanation" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { InputParams, Results, Simulator } from './utils/simulator';
import { defaultParameters } from './utils/simulator';

import ParametersForm from './components/ParametersForm.vue';
import WaveChart from './components/WaveChart.vue';
import ResultsTable from './components/ResultsTable.vue';
import Explanation from './components/Explanation.vue';

import './assets/styles/container.css';

const simulator: Simulator = new Simulator();
const interval = ref<number | null>(null);
const parameters = ref<InputParams>(defaultParameters);

const voltage = ref<number[]>(simulator.V);
const current = ref<number[]>(simulator.I);
const results = ref<Results>(simulator.calculateResults());

watch(
  parameters,
  (newParameters) => {
    stop();
    simulator.setParameters({ ...newParameters });
    voltage.value = [...simulator.V];
    current.value = [...simulator.I];
    results.value = simulator.calculateResults();
  },
  { deep: true }
);

const simulate = (parameters: InputParams) => {
  stop();
  simulator.setParameters({ ...parameters });
  start();
};

const start = () => {
  stop();
  interval.value = setInterval(() => {
    update();
  }, 15); // Update every 15 ms
};

const stop = () => {
  if (interval.value) {
    clearInterval(interval.value);
  }
};

const update = () => {
  simulator.updateTimeStep();
  voltage.value = [...simulator.V];
  current.value = [...simulator.I];
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

#simulation {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.wave-chart {
  aspect-ratio: 1.8 / 1;
  width: 100% !important;
  height: 100% !important;
}

@media (max-width: 849px) {
  #simulation {
    flex-direction: column;
  }
}

.card {
  background: white;
  border-radius: 0.5rem;
  padding: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

#explanation {
  margin-top: 2rem;
  margin-bottom: 3rem;
}
</style>
