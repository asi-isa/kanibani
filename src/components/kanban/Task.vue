<script setup lang="ts">
import { ref } from "vue";

import Subtask from "../form/subtasks/Subtask.vue";
import type { SubtaskType } from "../form/subtasks/SubtasksInput.vue";
import Modal from "../util/Modal.vue";
import type { TaskType } from "./AddTask.vue";
import getFromLs from "../../utils/getFromLS";

interface TaskProps {
  task: TaskType;
}

const props = defineProps<TaskProps>();

const emit = defineEmits(["change"]);

const showModal = ref(false);

const subtasks = ref<SubtaskType[]>(getSubtasks());

function getSubtasks() {
  return getFromLs<SubtaskType>(
    "subtasks",
    (st) => st.taskId === props.task.id
  );
}

function onChange() {
  emit("change");

  subtasks.value = getSubtasks();
}
</script>

<template>
  <div
    class="bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] w-64 p-4 rounded-md flex flex-col gap-2 cursor-pointer"
    @click="showModal = true"
  >
    <p class="font-bold">{{ props.task.title }}</p>
    <p class="text-sm text-[var(--color-muted)]">
      {{ subtasks.filter((st) => st.isFinished).length }} of
      {{ subtasks.length }}
      subtasks
    </p>
  </div>

  <Modal :show="showModal" :title="props.task.title" @close="showModal = false">
    <div class="flex flex-col gap-3">
      <p>{{ props.task.description }}</p>

      <p>
        Subtasks ({{ subtasks.filter((st) => st.isFinished).length }} of
        {{ subtasks.length }})
      </p>

      <template v-for="subtask in subtasks" :id="subtask.id">
        <Subtask :subtask="subtask" @change="onChange" />
      </template>
    </div>
  </Modal>
</template>
