<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { IconArrowRight } from "@iconify-prerendered/vue-mdi";

interface CreateBoardActiveProps {
  modelValue: string;
}

const { modelValue } = defineProps<CreateBoardActiveProps>();

const emit = defineEmits(["update:modelValue", "submit", "blur"]);

const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value!.focus();
});

// emit blur event when input lost focus and the mousepointer is
// not over the form => prevents false emitting when button is clicked
const mouseLeft = ref(false);
const inputBlured = ref(false);
watch([mouseLeft, inputBlured], () => {
  if (mouseLeft.value && inputBlured.value) {
    emit("blur");
  }
});
</script>

<template>
  <form
    class="flex items-center justify-between gap-3 py-1 pl-5 rounded-r-2xl text-[var(--color)] dark:text-[var(--color-dark)] cursor-pointer"
    @mouseleave="mouseLeft = true"
    @mouseover="mouseLeft = false"
  >
    <input
      ref="inputRef"
      class="bg-inherit w-full focus:outline-none"
      type="text"
      placeholder="e.g. Vuejs"
      required
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      @blur="inputBlured = true"
    />

    <button
      class="bg-[var(--accent)] w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center"
      @click="emit('submit')"
    >
      <IconArrowRight class="text-white" />
    </button>
  </form>
</template>
