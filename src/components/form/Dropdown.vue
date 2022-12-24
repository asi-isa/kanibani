<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { IconChevronDown } from "@iconify-prerendered/vue-mdi";
import type { ColumnType } from "../kanban/AddColumn.vue";
import type { BoardType } from "../Sidebar.vue";

interface DropdownProps {
  title: string;
  board: BoardType | undefined;
}

const props = defineProps<DropdownProps>();

const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const columns = ref(getColumns());
const selectedColumn = ref(columns.value[0]);

// no duplication
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

function onSelect(column: ColumnType) {
  showDropdown.value = false;
  selectedColumn.value = column;
}

watchEffect(() => {
  emit("update:modelValue", selectedColumn.value.id);
});
</script>

<template>
  <div
    class="flex justify-between items-center border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-md py-2 px-3 w-full bg-inherit cursor-pointer"
    @click.self="showDropdown = true"
  >
    <p>{{ selectedColumn.title }}</p>

    <IconChevronDown
      class="text-lg text-[var(--accent)]"
      @click.self="showDropdown = true"
    />

    <div
      v-if="showDropdown"
      class="absolute top-0 left-0 right-0 z-10 flex flex-col rounded-md bg-[var(--color)] dark:bg-[var(--color-dark)]"
    >
      <template v-for="column in columns" :id="column.id">
        <p
          @click.self="onSelect(column)"
          class="text-[var(--color-dark)] p-3 hover:bg-[var(--accent)] dark:hover:text-[var(--color-dark)] rounded-md"
          :class="[
            {
              'bg-[var(--accent-66)]': column.id === selectedColumn.id,
            },
            column.id === selectedColumn.id
              ? 'dark:text-[var(--color-dark)]'
              : 'dark:text-[var(--color)]',
          ]"
        >
          {{ column.title }}
        </p>
      </template>
    </div>
  </div>
</template>
