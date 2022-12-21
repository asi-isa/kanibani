<script setup lang="ts">
import type { BoardType } from "../Sidebar.vue";
import AddColumn from "./AddColumn.vue";
import Column from "./Column.vue";
import Task from "./Task.vue";

interface KanbanProps {
  board: BoardType | undefined;
}

const { board } = defineProps<KanbanProps>();

function onCreated() {
  console.log(localStorage.getItem("columns"));
}
</script>

<template>
  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <Column name="TODO" color="bg-orange-400">
      <Task />
      <Task />
      <Task />
      <Task />
    </Column>

    <Column name="DOING" color="bg-blue-400">
      <Task />
      <Task />
      <Task />
      <Task />
    </Column>

    <!-- TODO save id as property in board obj -->
    <AddColumn :board-id="board?.id" @created="onCreated" />
  </div>
</template>
