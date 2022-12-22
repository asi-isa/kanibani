<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import CreateBoardInactive from "./CreateBoardInactive.vue";
import CreateBoardActive from "./CreateBoardActive.vue";
import type { BoardType } from "../Sidebar.vue";

const emit = defineEmits(["created"]);

const showInput = ref(false);

const title = ref("");

function createColumn(title: string, color: string, boardId: string) {
  const id = uuidv4();
  const date = new Date();

  const column = {
    id,
    boardId,
    date,
    title,
    color,
  };

  const previousColumns = JSON.parse(localStorage.getItem("columns") ?? "{}");

  const columns = {
    ...previousColumns,
    [id]: column,
  };

  localStorage.setItem("columns", JSON.stringify(columns));
}

function onSubmit() {
  // form input is valid
  if (title.value.trim()) {
    const previousBoardsAsStr = localStorage.getItem("boards");

    const previousBoards = JSON.parse(previousBoardsAsStr || "{}");

    const id = uuidv4();

    const board: BoardType = { id, title: title.value };

    const newBoards = {
      ...previousBoards,
      [id]: board,
    };

    localStorage.setItem("boards", JSON.stringify(newBoards));

    // create mandatory columns for every new board
    createColumn("TODO", "bg-indigo-600", id);
    createColumn("DOING", "bg-pink-600", id);
    createColumn("DONE", "bg-teal-800", id);

    showInput.value = false;

    title.value = "";

    emit("created", board);
  }
}
</script>

<template>
  <CreateBoardInactive v-if="!showInput" @click="showInput = true" />
  <CreateBoardActive
    v-else
    v-model="title"
    @submit="onSubmit"
    @blur="showInput = false"
  />
</template>
