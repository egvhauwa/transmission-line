<template>
  <div>
    <form @submit.prevent="submitForm">
      <div id="parameters">
        <ParameterInput
          v-model="model.Rc"
          label="Characteristic Impedance (Ω)"
          id="Rc"
        />
        <ParameterInput v-model="model.v" label="Signal Speed (m/s)" id="v" />
        <ParameterInput v-model="model.d" label="Length of Line (m)" id="d" />
        <ParameterInput
          v-model="model.Rg"
          label="Generator Impedance (Ω)"
          id="Rg"
        />
        <ParameterInput v-model="model.Rl" label="Load Impedance (Ω)" id="Rl" />
        <ParameterInput
          v-model="model.Cl"
          label="Load Capacitance (pF)"
          id="Cl"
          :scale="1e-12"
        />
        <ParameterInput v-model="model.A" label="Amplitude (V)" id="A" />
        <ParameterInput
          v-model="model.tBit"
          label="Bit Duration (ns)"
          id="tBit"
          :scale="1e-9"
        />
        <ParameterInput
          v-model="model.tRise"
          label="Bit Rise Time (ns)"
          id="tRise"
          :scale="1e-9"
        />
      </div>
      <div id="controls">
        <button type="submit">Simulate</button>
        <button type="button" @click="props.stop">Stop</button>
        <button type="button" @click="props.start">Resume</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { InputParams } from '../utils/simulator';

import ParameterInput from './ParameterInput.vue';

const props = defineProps<{
  simulate: (arg0: InputParams) => void;
  start: () => void;
  stop: () => void;
}>();

const model = defineModel<InputParams>({
  required: true,
});

const submitForm = () => {
  props.simulate(model.value);
};
</script>

<style scoped>
#parameters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(225px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

#controls {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>
