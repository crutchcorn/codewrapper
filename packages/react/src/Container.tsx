import { Container as ContainerBase } from "@mitosis.template/templating-base/react";
import { getState, setElement } from "@mitosis.template/core";
import {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
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
  const viewRef = useRef<EditorView>();

  const callback = useCallback((el: HTMLElement) => {
    if (!el) return;
    const view = setElement(el, getState());
    if (ref) assignRef(ref, view);
    viewRef.current = view;
  }, []);

  useEffect(() => {
    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  return <ContainerBase ref={callback} />;
});
