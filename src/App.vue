<template>
  <h1 id="header">Transmission line simulation</h1>
  <div id="sim">
    <ParametersForm :process="process" />
    <WaveChart :data="voltage" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { InputParams, SimulationResult, leapfrog2 } from "./utils/leapfrog";

import ParametersForm from "./components/ParametersForm.vue";
import WaveChart from "./components/WaveChart.vue";

const result = ref<SimulationResult>({
  V: [],
  I: [],
});
const voltage = ref(Array<number>(300).fill(0));
const interval = ref<number | null>(null);

const currentTime = ref<number>(0);

const process = (parameters: InputParams) => {
  console.log(parameters);
  // result.value = leapfrog(500, 300, parameters);
  result.value = leapfrog2(1000, 300, parameters);
  console.log(result.value);

  interval.value = setInterval(() => {
    if (currentTime.value < result.value.V.length - 1) {
      currentTime.value++;
      console.log(currentTime.value);
      voltage.value = result.value.V[currentTime.value];
    } else {
      //clearInterval(interval.value)
    }
  }, 10); // Update every second
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
