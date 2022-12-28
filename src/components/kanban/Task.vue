<script setup lang="ts">
import { ref } from "vue";
import { IconDotsVertical } from "@iconify-prerendered/vue-mdi";

import Subtask from "../form/subtasks/Subtask.vue";
import type { TaskType, SubtaskType, ColumnType, BoardType } from "@/types";
import Modal from "../util/Modal.vue";
import getFromLS from "../../utils/ls/getFromLS";
import deleteFromLS from "../../utils/ls/deleteFromLS";
import TaskForm from "../form/TaskForm.vue";

interface TaskProps {
  task: TaskType;
}

const props = defineProps<TaskProps>();

const emit = defineEmits(["change"]);

const board = ref<BoardType>(getBoard());

function getBoard() {
  const column = getFromLS<ColumnType>(
    "columns",
    (c) => c.id === props.task.columnId
  )[0];
  return getFromLS<BoardType>("boards", (b) => b.id === column.boardId)[0];
}

const showModal = ref(false);
const showMenu = ref(false);
const showEditForm = ref(false);

const subtasks = ref<SubtaskType[]>(getSubtasks());

function getSubtasks() {
  return getFromLS<SubtaskType>(
    "subtasks",
    (st) => st.taskId === props.task.id
  );
}

function onModalClose() {
  showMenu.value = false;
  showModal.value = false;
}

function onShowEditForm() {
  showEditForm.value = true;

  showMenu.value = false;
}

function onChange() {
  emit("change");

  subtasks.value = getSubtasks();
}

function onEdit() {
  showEditForm.value = false;

  onChange();
}

function onDelete() {
  deleteFromLS<TaskType>("tasks", (t) => t.id === props.task.id);
  deleteFromLS<SubtaskType>("subtasks", (st) => st.taskId === props.task.id);

  showModal.value = false;
  onChange();
}
</script>

<template>
  <div
    :id="props.task.id"
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

  <Modal :show="showModal" :title="props.task.title" @close="onModalClose">
    <template #header>
      <IconDotsVertical
        class="text-2xl opacity-80 hover:opacity-100 cursor-pointer"
        @click="showMenu = !showMenu"
      />

      <div
        v-if="showMenu"
        class="absolute top-6 right-6 py-2 px-4 rounded flex flex-col items-center gap-2 bg-[var(--color)] dark:bg-[var(--color-dark)] z-10"
      >
        <p
          class="dark:text-[var(--color)] text-[var(--color-dark)] cursor-pointer"
          @click="onShowEditForm"
        >
          Edit
        </p>
        <div
          class="w-full h-[1px] dark:bg-[var(--color)] bg-[var(--color-dark)]"
        ></div>
        <p
          class="dark:text-[var(--color)] text-[var(--color-dark)] cursor-pointer"
          @click="onDelete"
        >
          Delete
        </p>
      </div>
    </template>

    <div class="flex flex-col gap-5">
      <div>
        <p class="font-bold mb-2">Description</p>
        <p>{{ props.task.description }}</p>
      </div>

      <div>
        <p class="font-bold mb-2">
          Subtasks ({{ subtasks.filter((st) => st.isFinished).length }} of
          {{ subtasks.length }})
        </p>

        <div class="flex flex-col gap-2">
          <template v-for="subtask in subtasks" :id="subtask.id">
            <Subtask :subtask="subtask" @change="onChange" />
          </template>
        </div>
      </div>
    </div>
  </Modal>

  <Modal :show="showEditForm" title="Edit Task" @close="showEditForm = false">
    <TaskForm :default="props.task" :board="board" @created="onEdit" />
  </Modal>
</template>
