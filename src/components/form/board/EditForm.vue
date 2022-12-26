<script setup lang="ts">
import { ref, watch, watchEffect } from "vue";

import TextInput from "../TextInput.vue";
import OptionalTextInput from "../OptionalTextInput.vue";
import Btn from "../Btn.vue";
import type { ColumnType } from "@/components/kanban/AddColumn.vue";
import type { BoardType } from "@/components/Sidebar.vue";
import { updateLS } from "@/utils/ls";
import deleteFromLS, { deleteFromLSColumns } from "@/utils/ls/deleteFromLS";
import getFromLS from "@/utils/ls/getFromLS";

interface EditFormProps {
  board: BoardType;
}

const props = defineProps<EditFormProps>();

const emit = defineEmits(["update"]);

// isValid property => form validation
type BoardFormInput = {
  title: { value: string; isValid: boolean };
  columns: {
    value: { value: ColumnType; isValid: boolean }[];
    isValid: boolean;
  };
};

const formInputInitValues = {
  title: { value: "", isValid: true },
  columns: {
    value: [],
    isValid: true,
  },
};

const formInputs = ref<BoardFormInput>(formInputInitValues);

function getColumns() {
  return getFromLS<ColumnType>("columns", (c) => c.boardId === props.board.id);
}

function updateFormInputs() {
  const defaultColumns = getColumns().map((c) => ({
    value: c,
    isValid: true,
  }));

  formInputs.value = {
    title: { value: props.board.title ?? "", isValid: true },
    columns: {
      value: defaultColumns,
      isValid: true,
    },
  };
}

updateFormInputs();

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
    const title = formInputs.value.title.value;

    const board: BoardType = {
      id: props.board!.id,
      title,
    };

    updateLS("boards", board);

    // dont save form validation property isValid
    // add taskId to every subtask
    const columns = formInputs.value.columns.value.map((item) => ({
      ...item.value,
    }));

    const columnsToDelete = getColumns().filter((c) => {
      return !columns.some((c2) => c2.id === c.id);
    });

    columnsToDelete.forEach((ctd) => {
      deleteFromLSColumns((c) => c.id === ctd.id);
    });
    // update columns
    columns.forEach((column) => {
      updateLS("columns", column);
    });

    emit("update");
  }
}

function removeColumn(id: string) {
  formInputs.value.columns.value = formInputs.value.columns.value.filter(
    (c) => c.value.id !== id
  );
}
</script>

<template>
  <form class="flex flex-col gap-3">
    <TextInput
      name="Board Title"
      autofocus
      v-model="formInputs.title.value"
      :is-valid="formInputs.title.isValid"
      @change:is-valid="
          (state: boolean) => (formInputs.title.isValid = state)
        "
    />

    <div class="flex flex-col gap-2">
      <p class="text-medium">Columns</p>

      <div class="flex flex-col gap-2">
        <template
          v-for="column in formInputs.columns.value"
          :id="column.value.id"
        >
          <OptionalTextInput
            v-model="column.value.title"
            :is-valid="column.isValid"
            @delete="removeColumn(column.value.id)"
            @change:is-valid="(state: boolean) =>  column.isValid = state"
          />
        </template>
      </div>
    </div>

    <Btn title="Update Board" @click.prevent="onSubmit" />
  </form>
</template>
