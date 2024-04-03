import { EditorView } from "@codemirror/view";
import { Compartment, EditorState } from "@codemirror/state";

export const extensions = new Compartment();

export const getState = () => {
  return EditorState.create({
    extensions: extensions.of([]),
  });
};

export const setElement = (
  el: HTMLElement,
  state: ReturnType<typeof getState>,
) => {
  const view = new EditorView({
    state,
    parent: el,
  });

  return view;
};
