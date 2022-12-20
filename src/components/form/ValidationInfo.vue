<script setup lang="ts">
import FadeIn from "@/transition/FadeIn.vue";

interface ValidationInfoProps {
  validationInfo: string | null;
}

const { validationInfo } = defineProps<ValidationInfoProps>();
</script>

<template>
  <FadeIn>
    <div
      v-if="validationInfo"
      class="absolute right-0 top-0 bg-red-50 border border-red-400 rounded p-2"
    >
      <p class="text-red-600 font-medium">{{ validationInfo }}</p>
    </div>
  </FadeIn>
</template>
