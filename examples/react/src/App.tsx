import * as React from "react";
import { Container, useContainerState } from "@mitosis.template/react";

export default function App() {
  const [value, setValue, stateRef] = useContainerState(
    "<div>Test</div>\n\nTesting",
  );

  return (
    <div>
      <h2>Base CodeMirror Editor</h2>
      <Container ref={stateRef} />
      <h2>React Projected Value</h2>
      <pre>{value}</pre>
      <h2>React setValue Usage</h2>
      <textarea value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
