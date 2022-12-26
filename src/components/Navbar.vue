<script setup lang="ts">
import { ref } from "vue";
import { IconDotsVertical } from "@iconify-prerendered/vue-mdi";

import EditForm from "./form/board/EditForm.vue";
import AddTask from "./kanban/AddTask.vue";
import type { BoardType } from "./Sidebar.vue";
import Modal from "./util/Modal.vue";
import deleteFromLS, { deleteFromLSBoards } from "@/utils/ls/deleteFromLS";

import type { ColumnType } from "./kanban/AddColumn.vue";

interface NavbarProps {
  board: BoardType | undefined;
}

const props = defineProps<NavbarProps>();

const emit = defineEmits(["taskCreated", "update", "delete"]);

const showMenu = ref(false);
const showEditForm = ref(false);

function onShowEditForm() {
  showEditForm.value = true;

  showMenu.value = false;
}

function onDelete() {
  deleteFromLSBoards((b) => b.id === props.board?.id);

  showMenu.value = false;

  emit("delete");
}

function onUpdate() {
  emit("update");

  showEditForm.value = false;
}
</script>

<template>
  <div
    class="flex justify-between items-center w-full h-fit px-3 py-2 bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] flex-shrink-0"
  >
    <p class="text-xl font-bold">
      {{ props.board ? props.board.title : "Select a Board" }}
    </p>

    <div class="flex items-center gap-2">
      <AddTask :board="props.board" @created="emit('taskCreated')" />

      <IconDotsVertical
        class="text-xl text-[var(--color)] dark:text-[var(--color-dark)] cursor-pointer"
        :class="[
          { 'opacity-0': !props.board },
          { 'pointer-events-none': !props.board },
        ]"
        @click="showMenu = !showMenu"
      />

      <div
        v-if="showMenu"
        class="absolute top-6 right-6 py-3 px-4 rounded flex flex-col items-center gap-2 bg-[var(--color)] dark:bg-[var(--color-dark)] z-10"
      >
        <p
          class="dark:text-[var(--color)] text-[var(--color-dark)] cursor-pointer"
          @click="onShowEditForm"
        >
          Edit Board
        </p>
        <div
          class="w-full h-[1px] dark:bg-[var(--color)] bg-[var(--color-dark)]"
        ></div>
        <p
          class="dark:text-[var(--color)] text-[var(--color-dark)] cursor-pointer"
          @click="onDelete"
        >
          Delete Board
        </p>
      </div>
    </div>
  </div>

  <Modal :show="showEditForm" title="Edit Board" @close="showEditForm = false">
    <EditForm :board="props.board!" @update="onUpdate" />
  </Modal>
</template>
