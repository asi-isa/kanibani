<script setup lang="ts">
interface BtnProps {
  title: string;
}

const { title } = defineProps<BtnProps>();
</script>

<template>
  <div class="bg-[var(--accent)] p-2 rounded-3xl cursor-pointer mt-4">
    <p class="font-medium text-center">{{ title }}</p>
  </div>
</template>
