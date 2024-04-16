<script lang="ts" setup>
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@codewrapper/vue";
import { attachFakeTerm, PromptFn } from "@codewrapper/core";
import { Terminal as XTermTerminal } from "@xterm/xterm";

const onPrompt: PromptFn = (term, text) => {
  term.writeln(`You typed: ${text}`);
  term.prompt();
  return true;
};

function termCB({ term }: { term: XTermTerminal }) {
  attachFakeTerm(term, onPrompt);
}
</script>

<template>
  <h2>Base XTerm Usage</h2>
  <Terminal :ref="termCB as never" />
</template>
