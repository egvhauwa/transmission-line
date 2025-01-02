<template>
  <div>
    <h2>Parameters</h2>
    <form @submit.prevent="submitForm">
      <ParameterInput
        v-model="parameters.Rc"
        label="Characteristic Impedance (Ohm)"
        id="Rc"
      />
      <ParameterInput
        v-model="parameters.v"
        label="Signal Speed (m/s)"
        id="v"
      />
      <ParameterInput
        v-model="parameters.d"
        label="Length of Line (m)"
        id="d"
      />
      <ParameterInput
        v-model="parameters.Rg"
        label="Generator Impedance (Ohm)"
        id="Rg"
      />
      <ParameterInput
        v-model="parameters.Rl"
        label="Load Impedance (Ohm)"
        id="Rl"
      />
      <ParameterInput
        v-model="parameters.Cl"
        label="Load Capacitance (pF)"
        id="v"
        :scale="1e-12"
      />
      <ParameterInput v-model="parameters.A" label="Amplitude (V)" id="Rl" />
      <ParameterInput
        v-model="parameters.tBit"
        label="Bit Duration (ns)"
        id="tBit"
        :scale="1e-9"
      />
      <ParameterInput
        v-model="parameters.tRise"
        label="Bit Rise Time (ns)"
        id="tRise"
        :scale="1e-9"
      />
      <button type="submit">Run Simulation</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { InputParams } from '../utils/simulator';
import { defaultParameters } from '../utils/simulator';

import ParameterInput from './ParameterInput.vue';

const props = defineProps<{ process: Function }>();

const parameters = ref<InputParams>(defaultParameters);

const submitForm = () => {
  props.process(parameters.value);
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
