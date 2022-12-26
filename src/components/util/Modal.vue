<script setup lang="ts">
import { IconClose } from "@iconify-prerendered/vue-mdi";

interface ModalProps {
  show: boolean;
  title: string;
}

const { show, title } = defineProps<ModalProps>();

const emit = defineEmits(["close"]);
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="flex items-center justify-center absolute inset-0">
      <div
        class="absolute inset-0 bg-black opacity-50 z-20"
        @click="emit('close')"
      ></div>

      <div
        class="bg-[var(--background-muted)] dark:bg-[var(--background-muted-dark)] px-4 py-6 rounded-md z-30 flex flex-col gap-5 w-[94vw] max-w-md"
      >
        <div class="flex gap-2 justify-between items-center">
          <p class="text-xl font-bold">{{ title }}</p>
          <slot name="header">
            <IconClose @click="emit('close')" class="text-2xl cursor-pointer" />
          </slot>
        </div>

        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>
