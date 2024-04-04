import { CodeEditor as CodeEditorBase } from "@codewrapper/templating-base/react";
import { getCodeEditorState, setCodeEditorElement } from "@codewrapper/core";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useLayoutEffect,
  useState,
} from "react";
import type { EditorView } from "@codemirror/view";

function assignRef<T>(ref: ForwardedRef<T>, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

export const CodeEditor = forwardRef<EditorView>((_, ref) => {
  const [containerEl, setContainerEl] = useState<HTMLElement>();

  useLayoutEffect(() => {
    if (!containerEl) return;
    const view = setCodeEditorElement(containerEl, getCodeEditorState());
    if (ref) assignRef(ref, view);
    return () => {
      view.destroy();
    };
  }, [containerEl]);

  return (
    <CodeEditorBase
      ref={useCallback((view: HTMLElement) => setContainerEl(view), [])}
    />
  );
});
