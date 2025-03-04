<template>
  <div>
    <form @submit.prevent="handleSimulate">
      <div id="parameters">
        <ParameterInput
          id="Rc"
          v-model="model.Rc"
          label="Characteristic Impedance (Ω)"
          :min="1e-9"
        />
        <ParameterInput
          id="v"
          v-model="model.v"
          label="Signal Speed (10⁸ m/s)"
          :min="1"
          :max="3"
          :scale="1e8"
        />
        <ParameterInput id="d" v-model="model.d" label="Length of Line (m)" />
        <ParameterInput
          id="Rg"
          v-model="model.Rg"
          label="Generator Impedance (Ω)"
        />
        <ParameterInput id="Rl" v-model="model.Rl" label="Load Impedance (Ω)" />
        <ParameterInput
          id="Cl"
          v-model="model.Cl"
          label="Load Capacitance (pF)"
          :scale="1e-12"
        />
        <ParameterInput id="A" v-model="model.A" label="Amplitude (V)" />
        <ParameterInput
          id="tBit"
          v-model="model.tBit"
          label="Bit Duration (ns)"
          :scale="1e-9"
        />
        <ParameterInput
          id="tRise"
          v-model="model.tRise"
          label="Bit Rise Time (ns)"
          :scale="1e-9"
        />
      </div>
      <div id="controls">
        <button type="submit">Simulate</button>
        <button type="button" :disabled="isReset" @click="toggleSimulation">
          {{ isReset || isRunning ? 'Stop' : 'Resume' }}
        </button>
        <button type="button" @click="handleReset">Reset</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { InputParams } from '../utils/simulator';

import ParameterInput from './ParameterInput.vue';

const props = defineProps<{
  isRunning: boolean;
  isReset: boolean;
}>();

const model = defineModel<InputParams>({
  required: true,
});

const emit = defineEmits(['simulate', 'start', 'stop', 'reset']);

const handleSimulate = () => {
  emit('simulate', model.value);
};

const toggleSimulation = () => {
  if (props.isRunning) {
    emit('stop');
  } else {
    emit('start');
  }
};

const handleReset = () => {
  emit('reset');
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
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

button {
  flex: 1;
}
</style>
