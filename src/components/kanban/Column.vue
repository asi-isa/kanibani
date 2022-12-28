<script setup lang="ts">
import { onMounted } from "vue";
import Sortable from "sortablejs";

import Task from "./Task.vue";
import type { ColumnType, TaskType } from "@/types";
import getFromLS from "@/utils/ls/getFromLS";
import deleteFromLS from "@/utils/ls/deleteFromLS";
import { updateLS } from "@/utils/ls";

// TODO id as prop => fetch tasks
interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
}
const props = defineProps<ColumnProps>();

const emit = defineEmits(["change", "rerender"]);

onMounted(() => {
  const tasks = document.getElementById(props.column.id);
  Sortable.create(tasks!, {
    group: "tasks",
    animation: 200,
    onEnd: (ev) => {
      // get ls state ie previous tasks
      // delete tasks
      // add tasks with new colid and new order

      const fromColId = ev.from.id;
      const toColId = ev.to.id;

      const previousTasks = getFromLS<TaskType>("tasks");

      const taskIdsInFromCol = Array.from(ev.from.children).map((t) => t.id);
      const taskIdsInToCol = Array.from(ev.to.children).map((t) => t.id);

      const tasksInFromCol = taskIdsInFromCol.map((id, i) => {
        const task = previousTasks.filter((pt) => pt.id === id)[0];
        return { ...task, columnId: fromColId, order: i } as TaskType;
      });

      const tasksInToCol = taskIdsInToCol.map((id, i) => {
        const task = previousTasks.filter((pt) => pt.id === id)[0];
        return { ...task, columnId: toColId, order: i } as TaskType;
      });

      // add new state
      tasksInFromCol.forEach((t) => {
        updateLS<TaskType>("tasks", t);
      });

      tasksInToCol.forEach((t) => {
        updateLS<TaskType>("tasks", t);
      });

      emit("rerender");
    },
  });
});
</script>

<template>
  <div class="flex flex-col flex-shrink-0 gap-4 w-72">
    <div class="flex gap-2 items-center">
      <div class="w-3 h-3 rounded-full" :class="props.column.color"></div>
      <p class="tracking-wider text-[var(--color-muted)] uppercase">
        {{ props.column.title }} ({{ props.tasks.length }})
      </p>
    </div>

    <div
      :id="props.column.id"
      class="flex flex-col items-center gap-3 py-3 min-h-[6rem]"
    >
      <template v-for="task in props.tasks" :id="task.id">
        <Task :task="task" @change="emit('change')" />
      </template>
    </div>
  </div>
</template>
