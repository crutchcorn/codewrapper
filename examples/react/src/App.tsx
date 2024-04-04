import * as React from "react";
import { CodeEditor, useCodeEditorState } from "@codewrapper/react";

export default function App() {
  const [value, setValue, stateRef] = useCodeEditorState(
    "<div>Test</div>\n\nTesting",
  );

  return (
    <div>
      <h2>Base CodeMirror Editor</h2>
      <CodeEditor ref={stateRef} />
      <h2>React Projected Value</h2>
      <pre>{value}</pre>
      <h2>React setValue Usage</h2>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
