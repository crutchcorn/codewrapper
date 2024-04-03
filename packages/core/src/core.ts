import { basicSetup, EditorView } from "codemirror";
import { EditorState } from "@codemirror/state";

export const getState = () => {
  return EditorState.create({
    extensions: [basicSetup],
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
