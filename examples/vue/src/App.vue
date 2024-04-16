<script lang="ts" setup>
import "@xterm/xterm/css/xterm.css";
import { CodeEditor, useCodeEditorState, Terminal } from "@codewrapper/vue";
import { PromptFn } from "@codewrapper/core";

const { ref, value } = useCodeEditorState("<div>Test</div>\n\nTesting");
const setValue = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value;
};

const onPrompt: PromptFn = (term, text) => {
  term.writeln(`You typed: ${text}`);
  term.prompt(term);
  return true;
};
</script>

<template>
  <h2>Base CodeMirror Editor</h2>
  <CodeEditor :ref="ref" />
  <h2>Vue Projected Value</h2>
  <pre>{{ value }}</pre>
  <h2>Vue setValue Usage</h2>
  <textarea :value="value" @input="setValue($event)" />
  <h2>Base XTerm Usage</h2>
  <Terminal :onPrompt="onPrompt" />
</template>
