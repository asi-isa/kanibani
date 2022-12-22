<script setup lang="ts">
import { IconDotsVertical, IconPlus } from "@iconify-prerendered/vue-mdi";
import type { BoardType } from "./Sidebar.vue";

interface NavbarProps {
  board: BoardType | undefined;
}

const { board } = defineProps<NavbarProps>();

function onClicked() {
  console.log("clicked");
}
</script>

<template>
  <div
    class="flex justify-between items-center w-full h-fit px-3 py-2 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] flex-shrink-0"
  >
    <p class="text-xl font-bold">
      {{ board ? board.title : "Select a Board" }}
    </p>

    <div class="flex items-center gap-2">
      <div
        class="flex items-center gap-2 bg-[var(--accent)] py-2 px-4 rounded-3xl cursor-pointer"
        :class="[{ 'opacity-0': !board }, { 'pointer-events-none': !board }]"
        @click="onClicked"
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
