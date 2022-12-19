<script setup lang="ts">
import { ref } from "vue";
import {
  IconDotsTriangle,
  IconCheckboxBlankBadgeOutline,
  IconEyeOffOutline,
  IconEyeOutline,
} from "@iconify-prerendered/vue-mdi";

import FadeIn from "@/transition/FadeIn.vue";
import ToggleDarkMode from "./ToggleDarkMode.vue";

const hide = ref<boolean>(false);
</script>

<template>
  <div
    class="h-full w-fit flex flex-col gap-6 py-3 pr-5 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] transition-transform duration-1000"
    :class="{ '-translate-x-full': hide }"
  >
    <div class="flex items-center gap-3 text-3xl ml-5">
      <IconDotsTriangle class="text-[var(--accent)]" />
      <p class="font-bold">kanibani</p>
    </div>

    <div class="h-full flex flex-col justify-between">
      <div class="flex flex-col gap-3">
        <p class="text-[var(--color-muted)] text-xs tracking-wider ml-5">
          ALL BOARDS (7)
        </p>
        <div
          class="flex items-center gap-3 bg-[var(--accent)] py-1 pl-5 rounded-r-2xl"
        >
          <IconCheckboxBlankBadgeOutline />
          <p class="">Kanbani</p>
        </div>
        <div
          class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl text-[var(--color-muted)]"
        >
          <IconCheckboxBlankBadgeOutline />
          <p class="">TicTacToe</p>
        </div>
        <div
          class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl text-[var(--color-muted)]"
        >
          <IconCheckboxBlankBadgeOutline />
          <p class="">Vuejs</p>
        </div>
        <div
          class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl text-[var(--accent)]"
        >
          <IconCheckboxBlankBadgeOutline />
          <p>+ Create New Board</p>
        </div>
      </div>

      <div class="ml-4 flex flex-col gap-5">
        <ToggleDarkMode />

        <div
          @click="hide = true"
          class="flex items-center gap-3 text-[var(--color-muted)] cursor-pointer"
        >
          <IconEyeOffOutline />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </div>

    <FadeIn>
      <div
        v-show="hide"
        @click="hide = false"
        class="absolute bottom-12 -right-10 w-10 py-2 bg-[var(--accent)] flex items-center justify-center rounded-r-md cursor-pointer"
      >
        <IconEyeOutline class="text-xl" />
      </div>
    </FadeIn>
  </div>
</template>

<style scoped></style>
