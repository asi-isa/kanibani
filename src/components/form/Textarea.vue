<script setup lang="ts">
import ValidationInfo from "./ValidationInfo.vue";

interface TextareaProps {
  name: string;
  placeholder: string;
  isValid: boolean;
  modelValue: string;
}

const { name, placeholder, modelValue, isValid } = defineProps<TextareaProps>();

const emit = defineEmits(["update:modelValue", "change:isValid"]);

function onInput(ev: Event) {
  const value = (ev.target as HTMLTextAreaElement)!.value;

  emit("update:modelValue", value);
  emit("change:isValid", value !== "");
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="font-medium">{{ name }}</label>

    <textarea
      class="border border-[var(--color-muted)] rounded-sm py-2 px-3 bg-inherit placeholder:text-[var(--color-muted-dark)] resize-none"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <ValidationInfo :info="isValid ? null : `Please provide a ${name}`" />
  </div>
</template>
