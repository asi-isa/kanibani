<script setup lang="ts">
import { ref, watch } from "vue";

import type { BoardType, ColumnType, TaskType } from "@/types";
import AddColumn from "./AddColumn.vue";
import Column from "./Column.vue";
import Navbar from "../Navbar.vue";
import getFromLS from "../../utils/ls/getFromLS";

interface KanbanProps {
  board: BoardType | undefined;
}

const props = defineProps<KanbanProps>();

const emit = defineEmits(["delete"]);

// TODO abstract
const columns = ref<ColumnType[]>();

function getColumns() {
  return getFromLS<ColumnType>("columns", (c) => c.boardId === props.board?.id);
}

function updateColumns() {
  columns.value = getColumns();
}

function getTasks(columnId: string) {
  return getFromLS<TaskType>("tasks", (t) => t.columnId === columnId);
}

watch(() => props.board, updateColumns);
</script>

<template>
  <Navbar
    :board="props.board"
    @task-created="updateColumns"
    @update="updateColumns"
    @delete="emit('delete')"
  />

  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] transition-colors duration-500 p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <template v-for="column in columns" :id="column.id">
      <Column
        :column="column"
        :tasks="getTasks(column.id)"
        @change="updateColumns"
      />
    </template>

    <AddColumn
      v-if="props.board"
      :board="props.board"
      @created="updateColumns"
    />
  </div>
</template>
