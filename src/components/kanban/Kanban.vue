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

const columns = ref<ColumnType[]>(getColumns());
const boardColumns = ref<ColumnType[]>();

function getColumns() {
  const columnsAsString = localStorage.getItem("columns");
  const columnsAsObj = JSON.parse(columnsAsString || "{}");

  const columnsAsArray: ColumnType[] = [];
  for (let key in columnsAsObj) {
    const column = columnsAsObj[key];
    columnsAsArray.push(column);
  }

  return columnsAsArray;
}

function getBoardColumns() {
  return columns.value.filter((c) => c.boardId === props.board?.id);
}

function onBoardChanged() {
  boardColumns.value = getBoardColumns();
}

function onColumnCreated() {
  columns.value = getColumns();
  boardColumns.value = getBoardColumns();
}

watch(() => props.board, onBoardChanged);
</script>

<template>
  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] transition-colors duration-500 p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <template v-for="board in boardColumns">
      <Column :name="board.title" :color="board.color">
        <Task />
        <Task />
        <Task />
        <Task />
      </Column>
    </template>

    <AddColumn
      v-if="props.board"
      :board="props.board"
      @created="onColumnCreated"
    />
  </div>
</template>
