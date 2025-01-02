<template>
  <div class="parameter-input">
    <label :for="id">{{ label }}</label>
    <input :id="id" v-model="unscaledInput" type="number" @input="scaleInput" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineModel } from 'vue';

const props = defineProps<{
  label: string;
  id: string;
  scale?: number;
}>();

const model = defineModel({ type: Number, required: true });

const scaleFactor: number = props.scale || 1; // Default scale factor is 1 (no scaling)
const unscaledInput = ref<number>(model.value / scaleFactor);

const scaleInput = () => {
  model.value = unscaledInput.value * scaleFactor;
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
  border-radius: 4px;
}
</style>
