<script setup lang="ts">
import AddColumn from "./AddColumn.vue";
import Column from "./Column.vue";
import Task from "./Task.vue";
</script>

<template>
  <div
    class="bg-[var(--background)] dark:bg-[var(--background-dark)] p-4 flex gap-4 w-screen h-fit overflow-auto"
  >
    <Column name="TODO" color="orange-400">
      <Task />
      <Task />
      <Task />
      <Task />
    </Column>

    <Column name="DOING" color="blue-400">
      <Task />
      <Task />
      <Task />
      <Task />
    </Column>

    <AddColumn />
  </div>
</template>
