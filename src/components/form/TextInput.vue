<script setup lang="ts">
import ValidationInfo from "./ValidationInfo.vue";

interface TextInputProps {
  name: string;
  placeholder: string;
  isValid: boolean;
  modelValue: string;
}

const { name, placeholder, modelValue, isValid } =
  defineProps<TextInputProps>();

const emit = defineEmits(["update:modelValue", "change:isValid"]);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)!.value;

  emit("update:modelValue", value);
  emit("change:isValid", value !== "");
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="font-medium">{{ name }}</label>

    <input
      class="border border-[var(--color-muted)] rounded-sm py-2 px-3 bg-inherit placeholder:text-[var(--color-muted-dark)]"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <ValidationInfo :info="isValid ? null : `Please provide a ${name}`" />
  </div>
</template>
