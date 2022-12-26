<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

import getFromLS from "@/utils/getFromLS";
import type { TaskType } from "../kanban/AddTask.vue";
import type { OptionType } from "./Dropdown.vue";
import type { SubtaskType } from "./subtasks/SubtasksInput.vue";
import TextInput from "./TextInput.vue";
import Textarea from "./Textarea.vue";
import SubtasksInput from "./subtasks/SubtasksInput.vue";
import Dropdown from "./Dropdown.vue";
import Btn from "./Btn.vue";
import type { ColumnType } from "../kanban/AddColumn.vue";
import type { BoardType } from "../Sidebar.vue";

interface TaskFormProps {
  default?: TaskType;
  dropdownOptions?: OptionType[];
  dropdownDefault?: OptionType;
}

const props = defineProps<TaskFormProps>();
const emit = defineEmits(["created"]);

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

const defaultSubtasks = getFromLS<SubtaskType>(
  "subtasks",
  (st) => st.taskId === props.default?.id
)?.map((st) => ({
  value: st,
  isValid: true,
}));

const formInputInitValues = {
  title: { value: props.default?.title ?? "", isValid: true },
  description: { value: props.default?.description ?? "", isValid: true },
  subtasks: {
    value: defaultSubtasks,
    isValid: true,
  },
  columnId: { value: props.default?.columnId ?? "", isValid: true },
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
    const id = props.default?.id ?? uuidv4();
    const title = formInputs.value.title.value;
    const description = formInputs.value.description.value;

    const columnId = formInputs.value.columnId.value;

    const task: TaskType = {
      id,
      title,
      description,
      columnId,
    };

    console.log("onSubmit, task", task);

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

    formInputs.value = formInputInitValues;

    emit("created");
  }
}

function getDropdownOptions() {
  const boardId = getFromLS<ColumnType>(
    "columns",
    (c) => c.id === props.default?.columnId
  )[0].boardId;
  const columns = getFromLS<ColumnType>(
    "columns",
    (c) => c.boardId === boardId
  );
  const dropdownOptions: OptionType[] = columns.map((c) => ({
    value: c.id,
    label: c.title,
  }));

  return dropdownOptions;
}

const dropdownOptions = ref<OptionType[]>(
  props.dropdownOptions ?? getDropdownOptions()
);

function getDropdownDefault() {
  const column = getFromLS<ColumnType>(
    "columns",
    (c) => c.id === props.default?.columnId
  )[0];

  return { label: column.title, value: column.id } as OptionType;
}

const dropdownDefault = ref<OptionType>(
  props.dropdownDefault ?? getDropdownDefault()
);

watch(
  formInputs,
  () => {
    console.log("formInputs", formInputs.value);
  },
  { deep: true }
);
</script>

<template>
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

    <SubtasksInput
      v-model="formInputs.subtasks.value"
      :is-valid="formInputs.subtasks.isValid"
    />

    <Dropdown
      :options="dropdownOptions"
      :default="dropdownDefault"
      v-model="formInputs.columnId.value"
    />

    <Btn
      :title="`${props.default ? 'Update' : 'Create'} Task`"
      @click.prevent="onSubmit"
    />
  </form>
</template>
