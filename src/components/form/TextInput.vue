<script setup lang="ts">
import ValidationInfo from "./ValidationInfo.vue";

interface TextInputProps {
  name: string;
  placeholder: string;
  validation: null | string;
  modelValue: string;
}

const { name, placeholder, modelValue, validation } =
  defineProps<TextInputProps>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="font-medium">{{ name }}</label>

    <input
      class="border border-[var(--color-muted)] rounded-sm py-2 px-3 bg-inherit placeholder:text-[var(--color-muted-dark)]"
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement)!.value)
      "
    />

    <ValidationInfo :validation-info="validation" />
  </div>
</template>
