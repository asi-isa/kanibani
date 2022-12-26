<script setup lang="ts">
import { ref, watch } from "vue";

import { IconPlus } from "@iconify-prerendered/vue-mdi";

import type { BoardType } from "../Sidebar.vue";
import Modal from "../util/Modal.vue";
import TaskForm from "../form/TaskForm.vue";
import getFromLS from "@/utils/ls/getFromLS";
import type { ColumnType } from "./AddColumn.vue";
import type { OptionType } from "../form/Dropdown.vue";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  columnId: string;
};

interface AddTaskProps {
  board: BoardType | undefined;
}

const props = defineProps<AddTaskProps>();

const emit = defineEmits(["created"]);

const showForm = ref(false);

function getColumns() {
  return getFromLS<ColumnType>("columns", (c) => c.boardId === props.board?.id);
}

const dropdownOptions = ref<OptionType[]>();
const dropdownOptionDefault = ref<OptionType>();

watch(
  () => props.board,
  () => {
    dropdownOptions.value = getColumns().map((c) => ({
      value: c.id,
      label: c.title,
    }));

    dropdownOptionDefault.value = dropdownOptions.value[0];
  }
);

function onCreated() {
  showForm.value = false;

  emit("created");
}
</script>

<template>
  <div
    class="flex items-center gap-2 bg-[var(--accent)] py-2 px-4 rounded-3xl cursor-pointer"
    :class="[
      { 'opacity-0': !props.board },
      { 'pointer-events-none': !props.board },
    ]"
    @click="showForm = true"
  >
    <IconPlus class="text-xl" />
    <p class="font-bold">Add New Task</p>
  </div>

  <Modal :show="showForm" title="Add New Task" @close="showForm = false">
    <TaskForm
      :dropdown-options="dropdownOptions"
      :dropdown-default="dropdownOptionDefault"
      @created="onCreated"
    />
  </Modal>
</template>
