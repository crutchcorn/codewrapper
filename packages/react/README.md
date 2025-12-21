# CodeWrapper React

A modular, framework-agnostic library for building interactive code editors and terminals in the browser. Built on top of [CodeMirror](https://codemirror.net/) for code editing and [xterm.js](https://xtermjs.org/) for terminal emulation, with optional [WebContainers](https://webcontainers.io/) integration for in-browser code execution.

## Installation

```shell
pnpm add @codewrapper/react @codemirror/state @codemirror/view @xterm/xterm react
```

## Usage

### Basic Code Editor

```tsx
import { CodeEditor, useCodeEditorState } from "@codewrapper/react";
import { EditorView } from "@codemirror/view";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

function App() {
  const [value, setValue, stateRef] = useCodeEditorState("<div>Hello</div>");

  function codeEditorRef(editor: EditorView) {
    stateRef(editor);
    const transaction = editor.state.update({
      effects: StateEffect.appendConfig.of([basicSetup]),
    });
    editor.dispatch(transaction);
  }

  return (
    <>
      <CodeEditor ref={codeEditorRef} />
      <pre>{value}</pre>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </>
  );
}
```

### Terminal with Fake Shell

```tsx
import { Terminal, attachFakeTerm, PromptFn } from "@codewrapper/react";
import { Terminal as XTermTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

function App() {
  const onPrompt: PromptFn = (term, text) => {
    term.writeln(`You typed: ${text}`);
    term.prompt();
    return true;
  };

  function terminalRef(term: XTermTerminal) {
    if (!term) return;
    attachFakeTerm(term, onPrompt);
  }

  return <Terminal ref={terminalRef} />;
}
```

### Code Execution with WebContainers

```tsx
import { Terminal, useCodeExecution } from "@codewrapper/react";
import "@xterm/xterm/css/xterm.css";

const files = {
  "index.js": {
    file: {
      contents: `
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from WebContainers!');
});

app.listen(3000);
      `,
    },
  },
  "package.json": {
    file: {
      contents: JSON.stringify({
        name: "example",
        type: "module",
        dependencies: { express: "latest" },
        scripts: { start: "node index.js" },
      }),
    },
  },
};

function App() {
  const { terminalRef, iframeUrl } = useCodeExecution(files);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        {iframeUrl && <iframe src={iframeUrl} />}
      </div>
      <div style={{ flex: 1 }}>
        <Terminal ref={terminalRef} />
      </div>
    </div>
  );
}
```