<script setup lang="ts">
import { ref, watch } from "vue";

import { IconPlus } from "@iconify-prerendered/vue-mdi";

import type { BoardType } from "@/types";
import Modal from "../util/Modal.vue";
import TaskForm from "../form/TaskForm.vue";

interface AddTaskProps {
  board: BoardType | undefined;
}

const props = defineProps<AddTaskProps>();

const emit = defineEmits(["created"]);

const showForm = ref(false);

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
    <TaskForm @created="onCreated" :board="props.board!" />
  </Modal>
</template>
