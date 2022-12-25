<script setup lang="ts">
import { IconCheck } from "@iconify-prerendered/vue-mdi";

import type { SubtaskType } from "./SubtasksInput.vue";
import getFromLS from "@/utils/getFromLS";

interface SubtaskProps {
  subtask: SubtaskType;
}

const props = defineProps<SubtaskProps>();

const emit = defineEmits(["change"]);

function toggleIsFinished() {
  const subtask = getFromLS<SubtaskType>(
    "subtasks",
    (st) => st.id === props.subtask.id
  )[0];

  const alteredSubtask: SubtaskType = {
    ...subtask,
    isFinished: !subtask.isFinished,
  };

  const previousSubtasks = JSON.parse(localStorage.getItem("subtasks") ?? "{}");

  localStorage.setItem(
    "subtasks",
    JSON.stringify({
      ...previousSubtasks,
      [alteredSubtask.id]: alteredSubtask,
    })
  );

  emit("change");
}
</script>

<template>
  <div
    class="flex gap-2 items-center p-2 bg-[var(--background)] dark:bg-[var(--background-dark)] cursor-pointer"
    @click="toggleIsFinished"
  >
    <div
      class="w-4 h-4 flex items-center justify-center border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-sm"
      :class="{ 'bg-[var(--accent)]': props.subtask.isFinished }"
    >
      <IconCheck v-if="props.subtask.isFinished" />
    </div>

    <p
      class="text-[var(--color)] dark:text-[var(--color-dark)]"
      :class="{
        'text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] line-through':
          props.subtask.isFinished,
      }"
    >
      {{ props.subtask.title }}
    </p>
  </div>
</template>
