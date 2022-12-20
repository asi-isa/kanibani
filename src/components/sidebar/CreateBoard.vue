<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { IconCheckboxBlankBadgeOutline } from "@iconify-prerendered/vue-mdi";

import Modal from "../util/Modal.vue";
import TextInput from "../form/TextInput.vue";
import Btn from "../form/Btn.vue";
import ColorSelection from "../form/ColorSelection.vue";

interface CreateBoardProps {}

// const {} = defineProps<CreateBoardProps>();

const emit = defineEmits(["created"]);

const showModal = ref(false);

const title = ref("");
// TODO unnecessary
const color = ref("");

// TODO more generic form validation logic
const formValidation = ref<{ title: string | null; color: string | null }>({
  title: null,
  color: null,
});

function validateFormInput() {
  formValidation.value.title = !title.value.trim()
    ? "Please provide a title."
    : null;

  formValidation.value.color = !color.value ? "Please select a color." : null;
}

function onSubmit() {
  validateFormInput();

  // form input is valid
  if (title.value.trim() && color.value) {
    const previousBoardsAsStr = localStorage.getItem("boards");

    const previousBoards = JSON.parse(previousBoardsAsStr || "{}");

    const id = uuidv4();

    const newBoards = {
      ...previousBoards,
      [id]: { title: title.value, color: color.value },
    };

    localStorage.setItem("boards", JSON.stringify(newBoards));

    showModal.value = false;

    title.value = "";
    color.value = "";

    emit("created");
  }
}

watch(title, () => {
  formValidation.value.title = !title.value.trim()
    ? "Please provide a title."
    : null;
});

watch(color, () => {
  formValidation.value.color = !color.value ? "Please provide a color." : null;
});
</script>

<template>
  <div
    class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl text-[var(--accent)] cursor-pointer"
    @click="showModal = true"
  >
    <IconCheckboxBlankBadgeOutline />
    <p>+ Create New Board</p>
  </div>

  <Modal :show="showModal" title="Create New Board" @close="showModal = false">
    <div class="flex flex-col gap-4">
      <TextInput
        name="Title"
        :validation="formValidation.title"
        placeholder="e.g. Marketing Plan"
        v-model="title"
      />

      <ColorSelection v-model="color" :validation="formValidation.color" />

      <Btn title="Create Board" @click="onSubmit" />
    </div>
  </Modal>
</template>
