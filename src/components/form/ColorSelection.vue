<script setup lang="ts">
import Color from "./Color.vue";
import ValidationInfo from "./ValidationInfo.vue";

interface ColorSelectionProps {
  modelValue: string;
  isValid: boolean;
}

const { modelValue, isValid } = defineProps<ColorSelectionProps>();

const emit = defineEmits(["update:modelValue", "change:isValid"]);

function onSelect(color: string) {
  emit("update:modelValue", color);

  emit("change:isValid", true);
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="font-medium">Color</p>

    <div class="flex gap-2">
      <Color
        color="bg-blue-500"
        :selected-color="modelValue"
        @selected="onSelect"
      />
      <Color
        color="bg-slate-700"
        :selected-color="modelValue"
        @selected="onSelect"
      />
      <Color
        color="bg-red-500"
        :selected-color="modelValue"
        @selected="onSelect"
      />
      <Color
        color="bg-yellow-500"
        :selected-color="modelValue"
        @selected="onSelect"
      />
      <Color
        color="bg-lime-500"
        :selected-color="modelValue"
        @selected="onSelect"
      />
      <Color
        color="bg-cyan-500"
        :selected-color="modelValue"
        @selected="onSelect"
      />
    </div>

    <ValidationInfo :info="isValid ? null : 'Please select a Color'" />
  </div>
</template>
