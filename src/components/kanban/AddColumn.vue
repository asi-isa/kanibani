<script setup lang="ts">
import { IconPlus } from "@iconify-prerendered/vue-mdi";
</script>

<template>
  <div
    class="bg-[var(--background-secondary)] dark:bg-[var(--background-secondary-dark)] w-64 flex items-center justify-center rounded-md cursor-pointer"
  >
    <div class="flex gap-2 items-center">
      <IconPlus class="text-xl" />
      <p class="text-xl">New Column</p>
    </div>
  </div>
</template>
