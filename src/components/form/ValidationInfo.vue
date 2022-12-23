<script setup lang="ts">
import FadeIn from "@/transition/FadeIn.vue";

interface ValidationInfoProps {
  info: string | null;
}

const { info } = defineProps<ValidationInfoProps>();
</script>

<template>
  <FadeIn>
    <div
      v-if="info"
      class="absolute right-0 top-0 bg-red-200 border border-red-600 rounded p-2"
    >
      <p class="text-red-600 font-medium">{{ info }}</p>
    </div>
  </FadeIn>
</template>
