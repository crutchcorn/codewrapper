import * as React from "react";
import { CodeEditor, useCodeEditorState } from "@codewrapper/react";
import { EditorView } from "@codemirror/view";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

export default function App() {
  const [value, setValue, stateRef] = useCodeEditorState(
    "<div>Test</div>\n\nTesting",
  );

  function codeEditorRef(editor: EditorView) {
    stateRef(editor);
    const transaction = editor.state.update({
      effects: StateEffect.appendConfig.of([basicSetup]),
    });
    editor.dispatch(transaction);
  }

  return (
    <>
      <h2>Base CodeMirror Editor</h2>
      <CodeEditor ref={codeEditorRef} />
      <h2>React Projected Value</h2>
      <pre>{value}</pre>
      <h2>React setValue Usage</h2>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </>
  );
}
