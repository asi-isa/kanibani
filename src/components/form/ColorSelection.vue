<script setup lang="ts">
import Color from "./Color.vue";
import ValidationInfo from "./ValidationInfo.vue";

interface ColorSelectionProps {
  modelValue: string;
  validation: string | null;
}

const { modelValue, validation } = defineProps<ColorSelectionProps>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="font-medium">Color</p>

    <div class="flex gap-2">
      <Color
        color="bg-blue-500"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
      <Color
        color="bg-slate-700"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
      <Color
        color="bg-red-500"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
      <Color
        color="bg-yellow-500"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
      <Color
        color="bg-lime-500"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
      <Color
        color="bg-cyan-500"
        :selected-color="modelValue"
        @selected="(color) => emit('update:modelValue', color)"
      />
    </div>

    <ValidationInfo :validation-info="validation" />
  </div>
</template>
