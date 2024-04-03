import * as React from "react";
import { Container, extensions } from "@mitosis.template/react";
import { useRef } from "react";
import {
  EditorView,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";

export default function App() {
  const viewRef = useRef<EditorView>();

  const [value, setValue] = React.useState<string>("");

  const assignRef = (view: EditorView) => {
    if (!view) return;
    const docSizePlugin = ViewPlugin.fromClass(
      class DocSize implements PluginValue {
        update(update: ViewUpdate) {
          if (update.docChanged) setValue(update.state.doc.toString());
        }
      },
    );

    const transaction = view.state.update({
      changes: { from: 0, insert: "<div>Test</div>\n\nTesting" },
      effects: extensions.reconfigure([docSizePlugin]),
    });
    view.dispatch(transaction);
    viewRef.current = view;
  };

  return (
    <div>
      <Container ref={assignRef} />
      <div>
        <h2>Value</h2>
        <pre>{value}</pre>
      </div>
    </div>
  );
}
