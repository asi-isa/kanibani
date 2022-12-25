<script setup lang="ts">
import Task from "./Task.vue";
import type { ColumnType } from "./AddColumn.vue";
import type { TaskType } from "./AddTask.vue";

// TODO id as prop => fetch tasks
interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}
const props = defineProps<ColumnProps>();

const emit = defineEmits(["change"]);
</script>

<template>
  <div class="flex flex-col flex-shrink-0 gap-4 w-64">
    <div class="flex gap-2 items-center">
      <div class="w-3 h-3 rounded-full" :class="props.column.color"></div>
      <p class="tracking-wider text-[var(--color-muted)] uppercase">
        {{ props.column.title }} ({{ props.tasks.length }})
      </p>
    </div>

    <div class="flex flex-col gap-3">
      <template v-for="task in props.tasks" :id="task.id">
        <Task :task="task" @change="emit('change')" />
      </template>
    </div>
  </div>
</template>
