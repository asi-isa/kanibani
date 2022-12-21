<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import CreateBoardInactive from "./CreateBoardInactive.vue";
import CreateBoardActive from "./CreateBoardActive.vue";

const emit = defineEmits(["created"]);

const showInput = ref(false);

const title = ref("");

function onSubmit() {
  // form input is valid
  if (title.value.trim()) {
    const previousBoardsAsStr = localStorage.getItem("boards");

    const previousBoards = JSON.parse(previousBoardsAsStr || "{}");

    const id = uuidv4();

    const newBoards = {
      ...previousBoards,
      [id]: { title: title.value },
    };

    localStorage.setItem("boards", JSON.stringify(newBoards));

    showInput.value = false;

    title.value = "";

    emit("created");
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
