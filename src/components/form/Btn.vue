<script setup lang="ts">
import { watch } from "vue";

interface BtnProps {
  title: string;
  invertColors?: boolean;
}

const { title, invertColors = false } = defineProps<BtnProps>();
</script>

<template>
  <button
    class="p-2 rounded-3xl cursor-pointer mt-4 w-full"
    :class="
      invertColors
        ? 'bg-[var(--color)] dark:bg-[var(--color-dark)]'
        : 'bg-[var(--accent)]'
    "
  >
    <p
      class="font-medium text-center"
      :class="
        !invertColors
          ? 'text-[var(--color)] dark:text-[var(--color-dark)]'
          : 'text-[var(--accent)]'
      "
    >
      {{ title }}
    </p>
  </button>
</template>
