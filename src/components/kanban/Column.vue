<script setup lang="ts">
interface ColumnProps {
  name: string;
  color: string;
}
const { name, color } = defineProps<ColumnProps>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2 items-center">
      <div class="w-3 h-3 rounded-full" :class="`bg-${color}`"></div>
      <p class="tracking-wider text-[var(--color-muted)]">{{ name }} (7)</p>
    </div>

    <div class="flex flex-col gap-3">
      <slot></slot>
    </div>
  </div>
</template>
