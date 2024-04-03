import {
  EditorView,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
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

export const docSizePlugin = (updateFn: (state: string) => void) =>
  ViewPlugin.fromClass(
    class DocSize implements PluginValue {
      constructor(val: EditorView) {
        updateFn(val.state.doc.toString());
      }
      update(update: ViewUpdate) {
        if (update.docChanged) updateFn(update.state.doc.toString());
      }
    },
  );
