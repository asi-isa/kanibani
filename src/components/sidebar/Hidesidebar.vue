<script setup lang="ts">
import { IconEyeOffOutline } from "@iconify-prerendered/vue-mdi";

interface HidesidebarProps {
  class?: string;
}

const props = defineProps<HidesidebarProps>();
const emit = defineEmits(["hide"]);
</script>

<template>
  <div
    @click="emit('hide')"
    class="flex items-center gap-3 text-[var(--color-muted)] cursor-pointer"
    :class="props.class"
  >
    <IconEyeOffOutline />
    <p>Hide Sidebar</p>
  </div>
</template>
