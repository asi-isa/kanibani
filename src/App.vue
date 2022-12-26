<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from "vue";

import type { BoardType } from "@/types";
import Sidebar from "./components/Sidebar.vue";
import Kanban from "./components/kanban/Kanban.vue";
import createWelcomeBoard from "./utils/createWelcomeBoard";

function setInitialThemeToLS() {
  // theme not set in ls
  if (!("theme" in localStorage)) {
    // look for any preferences
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  }
}

function setThemeToDocument() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

onBeforeMount(() => {
  setInitialThemeToLS();
  setThemeToDocument();
});

const hideSidebar = ref(false);

const selectedBoard = ref<BoardType>();

onMounted(() => {
  const welcomeBoard = createWelcomeBoard();

  if (welcomeBoard) {
    selectedBoard.value = welcomeBoard;
  }
});
</script>

<template>
  <Sidebar
    :hide="hideSidebar"
    :selected-board="selectedBoard"
    @select="(board) => (selectedBoard = board)"
    @hide="(state) => (hideSidebar = state)"
  />

  <div
    class="h-screen flex flex-col transition-all duration-500 overflow-x-hidden"
    :class="{ 'pl-60': !hideSidebar }"
  >
    <Kanban :board="selectedBoard" @delete="selectedBoard = undefined" />
  </div>
</template>

<style scoped></style>
