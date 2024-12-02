<template>
  <div>
    <h2>Parameters</h2>
    <form @submit.prevent="submitForm">
      <div class="form-item">
        <label for="Rc">Characteristic Impedance (Ohm)</label>
        <input
          v-model="parameters.Rc"
          type="number"
          id="Rc"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="v">Signal Speed (m/s)</label>
        <input
          v-model="parameters.v"
          type="number"
          id="v"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="d">Length of Line (m)</label>
        <input
          v-model="parameters.d"
          type="number"
          id="d"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="Rg">Generator Impedance (Ohm)</label>
        <input
          v-model="parameters.Rg"
          type="number"
          id="Rg"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="RL">Load Impedance (Ohm)</label>
        <input
          v-model="parameters.Rl"
          type="number"
          id="RL"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="CL">Load Capacitance (nF)</label>
        <input
          v-model="parameters.Cl"
          type="number"
          id="CL"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="A">Amplitude (V)</label>
        <input
          v-model="parameters.A"
          type="number"
          id="A"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="Tbit">Bit Duration (s)</label>
        <input
          v-model="parameters.Tbit"
          type="number"
          id="Tbit"
          step="any"
          required
        />
      </div>

      <div class="form-item">
        <label for="tau_r">Rise Time (s)</label>
        <input
          v-model="parameters.tau_r"
          type="number"
          id="tau_r"
          step="any"
          required
        />
      </div>

      <button type="submit">Run Simulation</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import type { InputParams } from "../utils/leapfrog";

const props = defineProps<{ process: Function }>();

const parameters = ref<InputParams>({
  Rc: 50,
  v: 2e8,
  d: 10,
  Rg: 50,
  Rl: 1000,
  Cl: 0,
  A: 1,
  Tbit: 1e-8,
  tau_r: 1e-9,
});

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

.form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
