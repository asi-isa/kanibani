<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { IconPlus } from "@iconify-prerendered/vue-mdi";

import type { BoardType } from "../Sidebar.vue";
import TextInput from "../form/TextInput.vue";
import Textarea from "../form/Textarea.vue";
import Btn from "../form/Btn.vue";
import Modal from "../util/Modal.vue";
import Subtasks from "../form/subtasks/Subtasks.vue";
import Dropdown from "../form/Dropdown.vue";

type TaskType = {
  id: string;
  columnId: string;
  // ...
};

interface AddTaskProps {
  board: BoardType | undefined;
}

const props = defineProps<AddTaskProps>();

const emit = defineEmits(["created"]);

const showForm = ref(false);

const formInputs = ref({
  title: { value: "", isValid: true },
  description: { value: "", isValid: true },
  subtasks: { value: [], isValid: true },
  columnId: { value: "", isValid: true },
});

function formValidation() {
  let formIsValid = true;

  for (const key_ in formInputs.value) {
    const key = key_ as keyof typeof formInputs.value;

    if (Object.prototype.hasOwnProperty.call(formInputs.value, key)) {
      const element = formInputs.value[key];

      if (!element.value) {
        formInputs.value[key].isValid = false;
        formIsValid = false;
      }
    }
  }

  return formIsValid;
}

function onSubmit() {
  const formIsValid = formValidation();

  if (formIsValid) {
    const id = uuidv4();
    const date = new Date();
    const title = formInputs.value.title.value;
    const description = formInputs.value.description.value;
    const subtasks = formInputs.value.subtasks.value;
    const columnId = formInputs.value.columnId.value;

    const task = {
      id,
      date,
      title,
      description,
      subtasks,
      columnId,
    };

    const previousTasks = JSON.parse(localStorage.getItem("tasks") ?? "{}");

    const tasks = {
      ...previousTasks,
      task,
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showForm.value = false;

    formInputs.value.title.value = "";
    formInputs.value.description.value = "";
    formInputs.value.subtasks.value = [];
    formInputs.value.columnId.value = "";

    emit("created");
  }
}

watch(
  formInputs,
  () => {
    console.log("formInputs", formInputs.value);
  },
  { deep: true }
);
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
    <form class="flex flex-col gap-4">
      <TextInput
        name="Title"
        placeholder="e.g. TODO"
        autofocus
        v-model="formInputs.title.value"
        :is-valid="formInputs.title.isValid"
        @change:is-valid="
          (state: boolean) => (formInputs.title.isValid = state)
        "
      />

      <Textarea
        name="Description"
        placeholder="e.g. TODO"
        v-model="formInputs.description.value"
        :is-valid="formInputs.description.isValid"
        @change:is-valid="
          (state: boolean) => (formInputs.description.isValid = state)
        "
      />

      <Subtasks
        v-model="formInputs.subtasks.value"
        :is-valid="formInputs.subtasks.isValid"
      />

      <Dropdown
        title="Status"
        :board="props.board"
        v-model="formInputs.columnId.value"
      />

      <Btn title="Create Tasks" @click.prevent="onSubmit" />
    </form>
  </Modal>
</template>
