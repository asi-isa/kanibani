<script setup lang="ts">
import { IconCheckboxBlankBadgeOutline } from "@iconify-prerendered/vue-mdi";

interface BoardTitleProps {
  name: string;
  isSelected: boolean;
}

const props = defineProps<BoardTitleProps>();

const emit = defineEmits(["select"]);
</script>

<template>
  <div
    class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl cursor-pointer hover:bg-[var(--accent)] transition-colors"
    :class="{ 'bg-[var(--accent)]': props.isSelected }"
    @click="emit('select')"
  >
    <IconCheckboxBlankBadgeOutline />
    <p class="">{{ props.name }}</p>
  </div>
</template>
