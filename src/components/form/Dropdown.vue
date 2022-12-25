<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { IconChevronDown } from "@iconify-prerendered/vue-mdi";

export type OptionType = { label: string; value: string };

interface DropdownProps {
  options: OptionType[] | undefined;
  default: OptionType | undefined;
}

const props = defineProps<DropdownProps>();

const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const selectedOption = ref(props.default);

function onSelect(option: OptionType) {
  showDropdown.value = false;
  selectedOption.value = option;
}

watchEffect(() => {
  emit("update:modelValue", selectedOption.value?.value);
});
</script>

<template>
  <div
    class="flex justify-between items-center border border-[var(--color-muted)] dark:border-[var(--color-muted-dark)] rounded-md py-2 px-3 w-full bg-inherit cursor-pointer"
    @click.self="showDropdown = true"
  >
    <p>{{ selectedOption?.label }}</p>

    <IconChevronDown
      class="text-lg text-[var(--accent)]"
      @click.self="showDropdown = true"
    />

    <div
      v-if="showDropdown"
      class="absolute top-0 left-0 right-0 z-10 flex flex-col rounded-md bg-[var(--color)] dark:bg-[var(--color-dark)]"
    >
      <template v-for="option in props.options" :id="option.value">
        <p
          @click.self="onSelect(option)"
          class="text-[var(--color-dark)] p-3 hover:bg-[var(--accent)] dark:hover:text-[var(--color-dark)] rounded-md"
          :class="[
            {
              'bg-[var(--accent-66)]': option.value === selectedOption?.value,
            },
            option.value === selectedOption?.value
              ? 'dark:text-[var(--color-dark)]'
              : 'dark:text-[var(--color)]',
          ]"
        >
          {{ option.label }}
        </p>
      </template>
    </div>
  </div>
</template>
