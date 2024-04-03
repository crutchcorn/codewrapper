import { Container as ContainerBase } from "@mitosis.template/templating-base/react";
import { getState, setElement } from "@mitosis.template/core";
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

export const Container = forwardRef<EditorView>((_, ref) => {
  const [containerEl, setContainerEl] = useState<HTMLElement>();

  useLayoutEffect(() => {
    if (!containerEl) return;
    const view = setElement(containerEl, getState());
    if (ref) assignRef(ref, view);
    return () => {
      view.destroy();
    };
  }, [containerEl]);

  return (
    <ContainerBase
      ref={useCallback((view: HTMLElement) => setContainerEl(view), [])}
    />
  );
});
