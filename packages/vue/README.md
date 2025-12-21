# CodeWrapper Vue

A modular, framework-agnostic library for building interactive code editors and terminals in the browser. Built on top of [CodeMirror](https://codemirror.net/) for code editing and [xterm.js](https://xtermjs.org/) for terminal emulation, with optional [WebContainers](https://webcontainers.io/) integration for in-browser code execution.

## Installation

```shell
pnpm add @codewrapper/vue @codemirror/state @codemirror/view @xterm/xterm vue
```

## Usage

```vue
<script lang="ts" setup>
import { CodeEditor, useCodeEditorState } from "@codewrapper/vue";

const { ref, value } = useCodeEditorState("<div>Hello</div>");
const setValue = (e: Event) => {
  value.value = (e.target as HTMLInputElement).value;
};
</script>

<template>
  <CodeEditor :ref="ref" />
  <pre>{{ value }}</pre>
  <textarea :value="value" @input="setValue($event)" />
</template>
```
