<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import ValidationInfo from "./ValidationInfo.vue";

interface TextInputProps {
  name: string;
  placeholder?: string;
  isValid: boolean;
  autofocus?: boolean;
  modelValue: string;
}

const props = defineProps<TextInputProps>();

const emit = defineEmits(["update:modelValue", "change:isValid"]);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)!.value;

  emit("update:modelValue", value);
  emit("change:isValid", value !== "");
}

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  if (props.autofocus) {
    inputRef.value!.focus();
  }
});

watchEffect(() => {
  console.log("props.modelValue", props.modelValue);
});
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="props.name" class="font-medium">{{ props.name }}</label>

    <input
      ref="inputRef"
      class="border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-md py-2 px-3 bg-inherit placeholder:text-[var(--color-muted-dark)]"
      type="text"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
    />

    <ValidationInfo
      :info="props.isValid ? null : `Please provide a ${props.name}`"
    />
  </div>
</template>
