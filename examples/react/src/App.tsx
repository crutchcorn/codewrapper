import * as React from "react";
import {
  CodeEditor,
  PromptFn,
  useCodeEditorState,
  Terminal,
} from "@codewrapper/react";
import "@xterm/xterm/css/xterm.css";

export default function App() {
  const [value, setValue, stateRef] = useCodeEditorState(
    "<div>Test</div>\n\nTesting",
  );

  const onPrompt: PromptFn = React.useCallback((term, text) => {
    term.writeln(`You typed: ${text}`);
    term.prompt(term);
    return true;
  }, []);

  return (
    <div>
      <h2>Base CodeMirror Editor</h2>
      <CodeEditor ref={stateRef} />
      <h2>React Projected Value</h2>
      <pre>{value}</pre>
      <h2>React setValue Usage</h2>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <h2>Base XTerm Usage</h2>
      <Terminal onPrompt={onPrompt} />
    </div>
  );
}
