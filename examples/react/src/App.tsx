import * as React from "react";
import { Container, extensions } from "@mitosis.template/react";
import { useRef } from "react";
import { EditorView } from "@codemirror/view";
import { zebraStripes } from "./zebra";

export default function App() {
  const viewRef = useRef<EditorView>();

  const assignRef = (view: EditorView) => {
    if (!view) return;
    const transaction = view.state.update({
      changes: { from: 0, insert: "<div>Test</div>\n\nTesting" },
      effects: extensions.reconfigure([zebraStripes()]),
    });
    view.dispatch(transaction);
    viewRef.current = view;
  };

  return <Container ref={assignRef} />;
}
