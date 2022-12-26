<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";

import OptionalTextInput from "../OptionalTextInput.vue";
import Btn from "../Btn.vue";
import ValidationInfo from "../ValidationInfo.vue";

export type SubtaskType = {
  id: string;
  taskId: string;
  title: string;
  isFinished: boolean;
};

interface SubtasksInputProps {
  modelValue: {
    value: SubtaskType;
    isValid: boolean;
  }[];
  isValid: boolean;
}

const props = defineProps<SubtasksInputProps>();

const emit = defineEmits(["update:modelValue"]);

function addSubtask() {
  const subtask = {
    value: { id: uuidv4(), taskId: "", title: "", isFinished: false },
    isValid: true,
  };

  emit("update:modelValue", [...props.modelValue, subtask]);
}

function removeSubtask(id: string) {
  emit(
    "update:modelValue",
    props.modelValue.filter((st) => st.value.id !== id)
  );
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="font-medium">Subtasks</p>

    <div class="flex flex-col gap-2">
      <template v-for="item in props.modelValue" :id="item.value.id">
        <OptionalTextInput
          v-model="item.value.title"
          :is-valid="item.isValid"
          @delete="removeSubtask(item.value.id)"
          @change:is-valid="(state: boolean) =>  item.isValid = state"
        />
      </template>
    </div>

    <Btn title="Add Subtask" invert-colors @click.prevent="addSubtask" />

    <ValidationInfo
      :info="props.isValid ? null : 'Please provide subtask descriptions.'"
    />
  </div>
</template>
