<script setup lang="ts">
import { Transition } from "vue";
import { animate } from "motion";

function onBeforeEnter(el: HTMLElement) {
  animate(el, { opacity: 0 });
}

function onEnter(el: HTMLElement, done: () => void) {
  animate(el, { opacity: 1 }).finished.then(done);
}

function onLeave(el: HTMLElement, done: () => void) {
  animate(el, { opacity: 0 }).finished.then(done);
}
</script>

<template>
  <Transition
    @before-enter="onBeforeEnter"
    @enter="onEnter"
    @leave="onLeave"
    :css="true"
  >
    <slot></slot
  ></Transition>
</template>
