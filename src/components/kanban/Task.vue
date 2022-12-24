<script setup lang="ts">
import type { TaskType } from "./AddTask.vue";

interface TaskProps {
  task: TaskType;
}

const props = defineProps<TaskProps>();
</script>

<template>
  <div
    class="bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] w-64 p-4 rounded-md flex flex-col gap-2 cursor-pointer"
  >
    <p class="font-bold">{{ props.task.title }}</p>
    <p class="text-sm text-[var(--color-muted)]">
      {{ props.task.subtasks.filter((st) => st.isFinished).length }} of
      {{ props.task.subtasks.length }}
      subtasks
    </p>
  </div>
</template>
