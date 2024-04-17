import { EditorView } from "@codemirror/view";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { StateEffect } from "@codemirror/state";
import { docUpdaterPlugin } from "@codewrapper/core";

export const useCodeEditorState = (initialState: string) => {
  const [value, _setValue] = useState<string>(initialState);

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

  const ref = useCallback((view: EditorView) => {
    const transaction = view.state.update({
      effects: StateEffect.appendConfig.of([
        docUpdaterPlugin((val) => _setValue(val)),
      ]),
    });
    view.dispatch(transaction);
    setViewRef(view);
  }, []);

  return [value, setValue, ref] as const;
};
