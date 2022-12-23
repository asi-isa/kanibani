<script setup lang="ts">
import { IconClose } from "@iconify-prerendered/vue-mdi";

import ValidationInfo from "../ValidationInfo.vue";

interface SubtaskInputProps {
  modelValue: string;
  isValid: boolean;
}

const props = defineProps<SubtaskInputProps>();
const emit = defineEmits(["update:modelValue", "change:isValid", "delete"]);

function onInput(e: Event) {
  const value = (e.target as HTMLInputElement)!.value;

  emit("update:modelValue", value);
  emit("change:isValid", value !== "");
}
</script>

<template>
  <div class="flex items-center gap-3 relative">
    <input
      ref="inputRef"
      class="border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-md py-2 px-3 w-full bg-inherit placeholder:text-[var(--color-muted-dark)]"
      type="text"
      placeholder="Some smaller task"
      :value="props.modelValue"
      @input="onInput"
    />

    <IconClose
      @click="emit('delete')"
      class="text-[var(--color-muted)] text-2xl cursor-pointer"
    />

    <ValidationInfo
      :info="props.isValid ? null : `Please provide a description`"
    />
  </div>
</template>
