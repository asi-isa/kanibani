<script setup lang="ts">
import { ref } from "vue";
import {
  IconWhiteBalanceSunny,
  IconMoonWaningCrescent,
} from "@iconify-prerendered/vue-mdi";

import Toggle from "./Toggle.vue";

const checked = ref<boolean>(localStorage.theme === "dark");

function toggleDarkMode() {
  if (localStorage.theme === "dark") {
    checked.value = false;
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    checked.value = true;
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}
</script>

<template>
  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] py-3 px-5 duration-500 rounded flex items-center justify-center w-full max-w-[14rem] gap-4"
  >
    <IconMoonWaningCrescent />
    <Toggle @click="toggleDarkMode" :checked="checked" />
    <IconWhiteBalanceSunny />
  </div>
</template>
