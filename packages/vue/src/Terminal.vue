<script setup lang="ts">
import { onUnmounted, shallowRef } from "vue";
// import { Terminal as TerminalBase } from "@codewrapper/templating-base/vue";
import { initTerm } from "@codewrapper/core";
import { Terminal as XTermTerminal } from "@xterm/xterm";

const term = shallowRef<XTermTerminal>();
const callback = (el: HTMLElement) => {
  if (!el) {
    return;
  }
  const localTerm = initTerm();
  localTerm.open(el);
  term.value = localTerm;
};

onUnmounted(() => {
  if (term.value) {
    term.value.dispose();
  }
});

defineExpose({ term });
</script>

<template>
  <div :ref="callback as never" />
  <!--  <TerminalBase :elRef="callback" />-->
</template>
