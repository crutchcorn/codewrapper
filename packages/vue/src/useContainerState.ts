import {
  EditorView,
  PluginValue,
  ViewPlugin,
  ViewUpdate,
} from "@codemirror/view";
import { customRef, ref, unref, watchSyncEffect } from "vue";
import { StateEffect } from "@codemirror/state";

export const useContainerState = (initialState: string) => {
  const _value = ref(initialState);

  const docSizePlugin = () =>
    ViewPlugin.fromClass(
      class DocSize implements PluginValue {
        constructor(val: EditorView) {
          _value.value = val.state.doc.toString();
        }
        update(update: ViewUpdate) {
          if (update.docChanged) _value.value = update.state.doc.toString();
        }
      },
    );

  const viewRef = ref<EditorView>();

  const value = customRef((track, trigger) => {
    return {
      get() {
        track();
        return _value.value;
      },
      set(val) {
        if (!viewRef.value) {
          trigger();
          return;
        }
        viewRef.value.dispatch({
          changes: {
            from: 0,
            to: viewRef.value.state.doc.length,
            insert: val || "",
          },
        });
        trigger();
      },
    };
  });

  watchSyncEffect(() => {
    if (!viewRef.value) return;
    if (initialState !== viewRef.value.state.doc.toString()) {
      value.value = initialState;
    }
  });

  const callbackRef = ({ view }: { view: EditorView }) => {
    const realView = unref(view);
    const transaction = realView.state.update({
      effects: StateEffect.appendConfig.of([docSizePlugin()]),
    });
    realView.dispatch(transaction);
    viewRef.value = realView;
  };

  return { value, ref: callbackRef };
};
