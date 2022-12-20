<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";

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
</script>

<template>
  <Sidebar />

  <Navbar />
</template>

<style scoped></style>
