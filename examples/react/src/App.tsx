import * as React from "react";
import { Container } from "@mitosis.template/react";
import { useEffect, useRef } from "react";
import { EditorView } from "@codemirror/view";

export default function App() {
  const viewRef = useRef<EditorView>();

  const assignRef = (view: EditorView) => {
    if (!view) return;
    const transaction = view.state.update({
      changes: { from: 0, insert: "This is a test" },
    });
    view.dispatch(transaction);
    viewRef.current = view;
  };

  return <Container ref={assignRef} />;
}
