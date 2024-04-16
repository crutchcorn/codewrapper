<script setup lang="ts">
import { onUnmounted, ShallowRef, shallowRef } from "vue";
// import { Terminal as TerminalBase } from "@codewrapper/templating-base/vue";
import { initTerm, PromptFn, CodeBlocksTerminal } from "@codewrapper/core";

interface TerminalProps {
  onPrompt: PromptFn;
}

interface TerminalExpose {
  term: CodeBlocksTerminal;
  prompt: (term: CodeBlocksTerminal) => void;
}

const props = defineProps<TerminalProps>();

const term = shallowRef<TerminalExpose["term"]>();
const prompt = shallowRef<TerminalExpose["prompt"]>();
const callback = (el: HTMLElement) => {
  if (!el) {
    return;
  }
  const { term: localTerm, prompt: localPrompt } = initTerm(props.onPrompt);
  localTerm.open(el);
  term.value = localTerm;
  prompt.value = localPrompt;
};

onUnmounted(() => {
  if (term.value) {
    term.value.dispose();
  }
});

const expose: {
  [key in keyof TerminalExpose]: ShallowRef<TerminalExpose[key] | undefined>;
} = {
  term,
  prompt,
};

defineExpose(expose);
</script>

<template>
  <div :ref="callback as never" />
  <!--  <TerminalBase :elRef="callback" />-->
</template>
