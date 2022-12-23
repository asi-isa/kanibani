<script setup lang="ts">
import { onMounted, ref } from "vue";
import ValidationInfo from "./ValidationInfo.vue";

interface TextInputProps {
  name: string;
  placeholder: string;
  isValid: boolean;
  autofocus?: boolean;
  modelValue: string;
}

const {
  name,
  placeholder,
  modelValue,
  isValid,
  autofocus = false,
} = defineProps<TextInputProps>();

const emit = defineEmits(["update:modelValue", "change:isValid"]);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)!.value;

  emit("update:modelValue", value);
  emit("change:isValid", value !== "");
}

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (autofocus) {
    inputRef.value!.focus();
  }
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="font-medium">{{ name }}</label>

    <input
      ref="inputRef"
      class="border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-md py-2 px-3 bg-inherit placeholder:text-[var(--color-muted-dark)]"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
    />

    <ValidationInfo :info="isValid ? null : `Please provide a ${name}`" />
  </div>
</template>
