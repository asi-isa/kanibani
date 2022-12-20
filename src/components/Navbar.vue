<script setup lang="ts">
import { IconDotsVertical, IconPlus } from "@iconify-prerendered/vue-mdi";
</script>

<template>
  <div
    class="flex justify-between items-center w-full h-fit px-3 py-2 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] flex-shrink-0"
  >
    <p class="text-xl font-bold">Kanibani</p>

    <div class="flex items-center gap-2">
      <div
        class="flex items-center gap-2 bg-[var(--accent)] py-2 px-4 rounded-3xl cursor-pointer"
      >
        <IconPlus class="text-xl" />
        <p class="font-bold">Add New Task</p>
      </div>

      <IconDotsVertical
        class="text-xl text-[var(--color-muted-dark)] cursor-pointer"
      />
    </div>
  </div>
</template>
