<script setup lang="ts">
import { IconPlus } from "@iconify-prerendered/vue-mdi";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

import ColorSelection from "../form/ColorSelection.vue";
import TextInput from "../form/TextInput.vue";
import Btn from "../form/Btn.vue";
import Modal from "../util/Modal.vue";

interface AddColumnProps {
  boardId: string | undefined;
}

const { boardId } = defineProps<AddColumnProps>();

const emit = defineEmits(["created"]);

const showForm = ref(false);

const formInputs = ref({
  title: { value: "", isValid: true },
  color: { value: "", isValid: true },
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
    const color = formInputs.value.color.value;

    console.log("boardid", boardId);

    const column = {
      boardId,
      date,
      title,
      color,
    };

    const previousColumns = JSON.parse(localStorage.getItem("columns") ?? "{}");

    const columns = {
      ...previousColumns,
      [id]: column,
    };

    localStorage.setItem("columns", JSON.stringify(columns));

    showForm.value = false;

    formInputs.value.color.value = "";
    formInputs.value.title.value = "";

    emit("created");
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div><p class="opacity-0">just for ui purposes</p></div>
    <div
      class="bg-[var(--background-secondary)] dark:bg-[var(--background-secondary-dark)] w-64 h-full flex items-center justify-center rounded-md cursor-pointer"
      @click="showForm = true"
    >
      <div class="flex gap-2 items-center">
        <IconPlus class="text-xl" />
        <p class="text-xl">New Column</p>
      </div>
    </div>
  </div>

  <Modal :show="showForm" title="Add Column" @close="showForm = false">
    <form class="flex flex-col gap-4">
      <TextInput
        name="Title"
        placeholder="e.g. TODO"
        v-model="formInputs.title.value"
        :is-valid="formInputs.title.isValid"
        @change:is-valid="
          (isValidState) => (formInputs.title.isValid = isValidState)
        "
      />

      <ColorSelection
        :is-valid="formInputs.color.isValid"
        @change:is-valid="
          (isValidState) => (formInputs.color.isValid = isValidState)
        "
        v-model="formInputs.color.value"
      />

      <Btn title="Add Column" @click.prevent="onSubmit" />
    </form>
  </Modal>
</template>
