<script setup lang="ts">
import { IconCheckboxBlankBadgeOutline } from "@iconify-prerendered/vue-mdi";

interface BoardTitleProps {
  name: string;
  selected: boolean;
}

const { name, selected } = defineProps<BoardTitleProps>();

const emit = defineEmits(["select"]);
</script>

<template>
  <div
    class="flex items-center gap-3 py-1 pl-5 rounded-r-2xl cursor-pointer"
    :class="{ 'bg-[var(--accent)]': selected }"
    @click="emit('select')"
  >
    <IconCheckboxBlankBadgeOutline />
    <p class="">{{ name }}</p>
  </div>
</template>
