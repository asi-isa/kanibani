<script setup lang="ts">
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

import SubtaskInput from "./SubtaskInput.vue";
import Btn from "../Btn.vue";
import ValidationInfo from "../ValidationInfo.vue";

export type SubtaskType = {
  id: string;
  taskId: string;
  title: string;
  isFinished: boolean;
};

interface SubtasksInputProps {
  isValid: boolean;
}

const props = defineProps<SubtasksInputProps>();

const emit = defineEmits(["update:modelValue"]);

// TODO No duplicate data storage
const subtasks = ref<
  {
    value: SubtaskType;
    isValid: boolean;
  }[]
>([
  {
    value: { id: uuidv4(), taskId: "", title: "", isFinished: false },
    isValid: true,
  },
]);

function addSubtask() {
  const subtask = {
    value: { id: uuidv4(), taskId: "", title: "", isFinished: false },
    isValid: true,
  };
  subtasks.value.push(subtask);
}

function removeSubtask(id: string) {
  subtasks.value = subtasks.value.filter((st) => st.value.id !== id);
}

watch(
  subtasks,
  () => {
    emit("update:modelValue", subtasks.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="font-medium">Subtasks</p>

    <div class="flex flex-col gap-2">
      <template v-for="item in subtasks" :id="item.value.id">
        <SubtaskInput
          v-model="item.value.title"
          :is-valid="item.isValid"
          @delete="removeSubtask(item.value.id)"
          @change:is-valid="(state: boolean) =>  item.isValid = state"
        />
      </template>
    </div>

    <Btn title="Add New Subtask" invert-colors @click.prevent="addSubtask" />

    <ValidationInfo
      :info="props.isValid ? null : 'Please provide subtask descriptions.'"
    />
  </div>
</template>
