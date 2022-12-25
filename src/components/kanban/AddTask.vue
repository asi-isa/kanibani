<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { IconPlus } from "@iconify-prerendered/vue-mdi";

import type { BoardType } from "../Sidebar.vue";
import TextInput from "../form/TextInput.vue";
import Textarea from "../form/Textarea.vue";
import Btn from "../form/Btn.vue";
import Modal from "../util/Modal.vue";
import Subtasksinput, {
  type SubtaskType,
} from "../form/subtasks/SubtasksInput.vue";
import Dropdown, { type OptionType } from "../form/Dropdown.vue";
import type { ColumnType } from "./AddColumn.vue";

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

// isValid property => form validation
type TaskFormInput = {
  title: { value: string; isValid: boolean };
  description: { value: string; isValid: boolean };
  // every subtask has its own isValid form validation property
  subtasks: {
    value: { value: SubtaskType; isValid: boolean }[];
    isValid: boolean;
  };
  columnId: { value: string; isValid: boolean };
};

const formInputInitValues = {
  title: { value: "", isValid: true },
  description: { value: "", isValid: true },
  subtasks: {
    value: [] as { value: SubtaskType; isValid: boolean }[],
    isValid: true,
  },
  columnId: { value: "", isValid: true },
};

const formInputs = ref<TaskFormInput>(formInputInitValues);

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
    const title = formInputs.value.title.value;
    const description = formInputs.value.description.value;

    const columnId = formInputs.value.columnId.value;

    const task: TaskType = {
      id,
      title,
      description,
      columnId,
    };

    const previousTasks = JSON.parse(localStorage.getItem("tasks") ?? "{}");

    const tasks = {
      ...previousTasks,
      [id]: task,
    };

    localStorage.setItem("tasks", JSON.stringify(tasks));

    // dont save form validation property isValid
    // add taskId to every subtask
    const subtasks = formInputs.value.subtasks.value.map((item) => ({
      ...item.value,
      taskId: id,
    }));

    subtasks.forEach((subtask) => {
      const previousSubTasks = JSON.parse(
        localStorage.getItem("subtasks") ?? "{}"
      );

      const subtasks = {
        ...previousSubTasks,
        [subtask.id]: subtask,
      };

      localStorage.setItem("subtasks", JSON.stringify(subtasks));
    });

    showForm.value = false;

    formInputs.value = formInputInitValues;

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

const columns = ref(getColumns());

function getAllColumns() {
  const columnsAsString = localStorage.getItem("columns");
  const columnsAsObj = JSON.parse(columnsAsString || "{}");

  const columnsAsArray: ColumnType[] = [];
  for (let key in columnsAsObj) {
    const column = columnsAsObj[key];
    columnsAsArray.push(column);
  }

  return columnsAsArray;
}

function getColumns() {
  return getAllColumns().filter((c) => c.boardId === props.board?.id);
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

      <Subtasksinput
        v-model="formInputs.subtasks.value"
        :is-valid="formInputs.subtasks.isValid"
      />

      <Dropdown
        :options="dropdownOptions"
        :default="dropdownOptionDefault"
        v-model="formInputs.columnId.value"
      />

      <Btn title="Create Tasks" @click.prevent="onSubmit" />
    </form>
  </Modal>
</template>
