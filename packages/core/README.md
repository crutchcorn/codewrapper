# CodeWrapper Core

A modular, framework-agnostic library for building interactive code editors and terminals in the browser. Built on top of [CodeMirror](https://codemirror.net/) for code editing and [xterm.js](https://xtermjs.org/) for terminal emulation, with optional [WebContainers](https://webcontainers.io/) integration for in-browser code execution.

## Installation

```shell
pnpm add @codewrapper/core @codemirror/state @codemirror/view @xterm/xterm
```

## Usage

```typescript
import {
  docUpdaterPlugin,
  getCodeEditorState,
  setCodeEditorElement,
} from "@codewrapper/core";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

const container = document.querySelector("#editor");
const view = setCodeEditorElement(container, getCodeEditorState());

const transaction = view.state.update({
  effects: StateEffect.appendConfig.of([
    basicSetup,
    docUpdaterPlugin((val) => console.log("Content:", val)),
  ]),
  changes: {
    from: 0,
    to: view.state.doc.length,
    insert: "<div>Hello World</div>",
  },
});
view.dispatch(transaction);
```
