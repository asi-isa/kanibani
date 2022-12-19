<script setup lang="ts">
interface Props {
  checked: boolean;
}

const { checked } = defineProps<Props>();
</script>

<template>
  <div
    class="bg-[var(--color)] dark:bg-[var(--accent)] w-9 h-5 px-1 rounded-full flex items-center cursor-pointer transition-all duration-500 ease"
    :class="checked ? 'pr-4' : 'pl-4'"
  >
    <div class="w-4 h-4 bg-[var(--color-muted)] rounded-full"></div>
  </div>
</template>
