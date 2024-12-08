<template>
  <h1 id="header">Transmission line simulation</h1>
  <div id="sim">
    <ParametersForm :process="process" />
    <WaveChart :data="voltage" />
    <WaveChart :data="current" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import {
  InputParams,
  SimulationResult,
  getMinimumLocations,
  update,
} from "./utils/fdtd";

import ParametersForm from "./components/ParametersForm.vue";
import WaveChart from "./components/WaveChart.vue";

const result = ref<SimulationResult>({
  V: [],
  I: [],
});
const voltage = ref(Array<number>(301).fill(0));
const current = ref(Array<number>(300).fill(0));
const interval = ref<number | null>(null);

const currentTime = ref<number>(0);

const process = (parameters: InputParams) => {
  const locations = getMinimumLocations(
    parameters.d,
    parameters.v,
    parameters.tRise
  );
  console.log(locations);
  result.value = update(500, 300, parameters);
  if (interval.value) {
    clearInterval(interval.value);
  }
  currentTime.value = 0;
  interval.value = setInterval(() => {
    if (currentTime.value < result.value.I.length - 1) {
      currentTime.value++;
      voltage.value = result.value.V[currentTime.value];
      current.value = result.value.I[currentTime.value];
    } else {
      //clearInterval(interval.value)
    }
  }, 20); // Update every 20 ms
};
</script>

<style scoped>
#header {
  padding: 15px;
  margin: 0%;
}

#sim {
  display: flex;
  flex-direction: row;
  height: 100vh;
  gap: 20px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
