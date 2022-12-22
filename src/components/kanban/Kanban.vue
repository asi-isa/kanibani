<script setup lang="ts">
import { ref, watch } from "vue";

import type { BoardType } from "../Sidebar.vue";
import AddColumn, { type ColumnType } from "./AddColumn.vue";
import Column from "./Column.vue";
import Task from "./Task.vue";

interface KanbanProps {
  board: BoardType | undefined;
}

const props = defineProps<KanbanProps>();

const columns = ref<ColumnType[]>();

function getAllColumns() {
  const columnsAsString = localStorage.getItem("columns");
  const columnsAsObj = JSON.parse(columnsAsString || "{}");

  const columnsAsArray: ColumnType[] = [];
  for (let key in columnsAsObj) {
    const column = columnsAsObj[key];
    columnsAsArray.push(column);
  }

  return columnsAsArray;
}

function getColumns() {
  return getAllColumns().filter((c) => c.boardId === props.board?.id);
}

function updateColumns() {
  columns.value = getColumns();
}

watch(() => props.board, updateColumns);
</script>

<template>
  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] transition-colors duration-500 p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <template v-for="column in columns">
      <Column :name="column.title" :color="column.color">
        <Task />
        <Task />
        <Task />
        <Task />
      </Column>
    </template>

    <AddColumn
      v-if="props.board"
      :board="props.board"
      @created="updateColumns"
    />
  </div>
</template>
