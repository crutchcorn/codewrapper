<script setup lang="ts">
import { onUnmounted, shallowRef } from "vue";
// import { Container as ContainerBase } from "@codewrapper/templating-base/vue";
import { setCodeEditorElement, getCodeEditorState } from "@codewrapper/core";
import { EditorView } from "@codemirror/view";

const view = shallowRef<EditorView>();
const callback = (el: HTMLElement) => {
  if (!el) {
    return;
  }
  view.value = setCodeEditorElement(el as HTMLElement, getCodeEditorState());
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
