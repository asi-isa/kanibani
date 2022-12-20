<script setup lang="ts">
interface ColorProps {
  color: string;
  selectedColor: string;
}

const { color, selectedColor } = defineProps<ColorProps>();

const emit = defineEmits(["selected"]);
</script>

<template>
  <div
    class="w-5 h-5 rounded-full cursor-pointer"
    :class="[
      {
        'border-2 border-[var(--color)] dark:border-[var(--color-dark)]':
          selectedColor === color,
      },
      color,
    ]"
    @click="emit('selected', color)"
  ></div>
</template>
