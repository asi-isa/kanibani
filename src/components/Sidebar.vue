<script setup lang="ts">
import {
  IconDotsTriangle,
  IconEyeOffOutline,
  IconEyeOutline,
} from "@iconify-prerendered/vue-mdi";

import FadeIn from "@/transition/FadeIn.vue";
import ToggleDarkMode from "./ToggleDarkMode.vue";
import BoardTitle from "./sidebar/BoardTitle.vue";
import CreateBoard from "./sidebar/CreateBoard.vue";

interface SidebarProps {
  hide: boolean;
}

const { hide } = defineProps<SidebarProps>();

const emit = defineEmits(["hide"]);

const boardsAsString = localStorage.getItem("boards");
const boards = JSON.parse(boardsAsString || "{}");
const boardsAsArray: { id: string; title: string }[] = [];

for (let key in boards) {
  boardsAsArray.push({ id: key, title: boards[key].title });
}
</script>

<template>
  <div
    class="h-screen flex flex-col gap-6 py-3 pr-5 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] border-r border-[var(--color-muted)] absolute left-0 top-0 bottom-0 z-10 transition-transform duration-500 w-56"
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

        <div v-for="board in boardsAsArray" :id="board.id">
          <!-- TODO selected logic -->
          <BoardTitle :name="board.title" :selected="true" />
        </div>

        <CreateBoard />
      </div>

      <div class="ml-4 flex flex-col gap-5">
        <ToggleDarkMode />

        <div
          @click="emit('hide', true)"
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
        @click="emit('hide', false)"
        class="absolute bottom-12 -right-10 w-10 py-2 bg-[var(--accent)] flex items-center justify-center rounded-r-md cursor-pointer"
      >
        <IconEyeOutline class="text-xl" />
      </div>
    </FadeIn>
  </div>
</template>

<style scoped></style>
