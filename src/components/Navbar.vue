<script setup lang="ts">
import { IconDotsVertical, IconPlus } from "@iconify-prerendered/vue-mdi";
import AddTask from "./kanban/AddTask.vue";
import type { BoardType } from "./Sidebar.vue";

interface NavbarProps {
  board: BoardType | undefined;
}

const props = defineProps<NavbarProps>();

const emit = defineEmits(["taskCreated"]);

function onClicked() {
  console.log("clicked");
}
</script>

<template>
  <div
    class="flex justify-between items-center w-full h-fit px-3 py-2 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] flex-shrink-0"
  >
    <p class="text-xl font-bold">
      {{ props.board ? props.board.title : "Select a Board" }}
    </p>

    <div class="flex items-center gap-2">
      <AddTask :board="props.board" @created="emit('taskCreated')" />

      <IconDotsVertical
        class="text-xl text-[var(--color-muted-dark)] cursor-pointer"
      />
    </div>
  </div>
</template>
