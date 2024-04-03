<script setup lang="ts">
import { onUnmounted, shallowRef } from "vue";
// import { Container as ContainerBase } from "@codewrapper/templating-base/vue";
import { setElement, getState } from "@codewrapper/core";
import { EditorView } from "@codemirror/view";

const view = shallowRef<EditorView>();
const callback = (el: HTMLElement) => {
  if (!el) {
    return;
  }
  view.value = setElement(el as HTMLElement, getState());
};

onUnmounted(() => {
  if (view.value) {
    view.value.destroy();
  }
});

defineExpose({ view });
</script>

<template>
  <div :ref="callback as never" />
  <!--  <ContainerBase :elRef="callback" />-->
</template>
