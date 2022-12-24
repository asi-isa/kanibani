<script setup lang="ts">
import { ref, watch } from "vue";

import type { BoardType } from "../Sidebar.vue";
import AddColumn, { type ColumnType } from "./AddColumn.vue";
import type { TaskType } from "./AddTask.vue";
import Column from "./Column.vue";
import Task from "./Task.vue";
import Navbar from "../Navbar.vue";

interface KanbanProps {
  board: BoardType | undefined;
}

const props = defineProps<KanbanProps>();

// TODO abstract
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

function getAllTasks() {
  const tasksAsString = localStorage.getItem("tasks");
  const taskssAsObj = JSON.parse(tasksAsString || "{}");

  const tasksAsArray: TaskType[] = [];
  for (let key in taskssAsObj) {
    const task = taskssAsObj[key];
    tasksAsArray.push(task);
  }

  return tasksAsArray;
}

function getTasks(columnId: string) {
  return getAllTasks().filter((t) => t.columnId === columnId);
}

watch(() => props.board, updateColumns);
</script>

<template>
  <Navbar :board="props.board" @task-created="updateColumns" />

  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] transition-colors duration-500 p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <template v-for="column in columns" :id="column.id">
      <Column :column="column" :tasks="getTasks(column.id)" />
    </template>

    <AddColumn
      v-if="props.board"
      :board="props.board"
      @created="updateColumns"
    />
  </div>
</template>
