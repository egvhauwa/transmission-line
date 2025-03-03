<template>
  <div class="parameter-input">
    <label :for="id">{{ label }}</label>
    <input
      :id="id"
      v-model="unscaledInput"
      type="number"
      step="any"
      :min="min"
      :max="props.max"
      required
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  id: string;
  min?: number;
  max?: number;
  scale?: number;
}>();

const model = defineModel({ type: Number, required: true });

const min: number = props.min || 0;
const scaleFactor: number = props.scale || 1; // Default scale factor is 1 (no scaling)

const unscaledInput = computed({
  get: () => model.value / scaleFactor,
  set: (newValue) => {
    if (isValidParameter(newValue)) {
      model.value = newValue * scaleFactor;
    }
  },
});

const isValidParameter = (parameter: number | string): boolean => {
  if (typeof parameter === 'string') return false;
  if (isNaN(parameter)) return false;
  if (parameter < min) return false;
  if (props.max !== undefined && parameter > props.max) return false;
  return true;
};
</script>

<style scoped>
.parameter-input {
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
  border-radius: 0.5rem;
}

input:invalid {
  border-color: red;
}
</style>
