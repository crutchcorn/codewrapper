import {
  EditorView,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { StateEffect } from "@codemirror/state";

export const useContainerState = (initialState: string) => {
  const [value, _setValue] = useState<string>(initialState);

  const docSizePlugin = useMemo(
    () =>
      ViewPlugin.fromClass(
        class DocSize implements PluginValue {
          constructor(val: EditorView) {
            _setValue(val.state.doc.toString());
          }
          update(update: ViewUpdate) {
            if (update.docChanged) _setValue(update.state.doc.toString());
          }
        },
      ),
    [],
  );

  const [viewRef, setViewRef] = useState<EditorView>();

  const setValue = useCallback(
    (val: string) => {
      if (!viewRef) return;
      viewRef.dispatch({
        changes: {
          from: 0,
          to: viewRef.state.doc.length,
          insert: val || "",
        },
      });
    },
    [viewRef],
  );

  const valueRef = useRef(initialState);

  useLayoutEffect(() => {
    if (!viewRef) return;
    if (valueRef.current !== viewRef.state.doc.toString()) {
      setValue(valueRef.current);
    }
  }, [viewRef]);

  const ref = useCallback(
    (view: EditorView) => {
      const transaction = view.state.update({
        effects: StateEffect.appendConfig.of([docSizePlugin]),
      });
      view.dispatch(transaction);
      setViewRef(view);
    },
    [docSizePlugin],
  );

  return [value, setValue, ref] as const;
};
