import { EditorView } from "@codemirror/view";
import { customRef, ref, unref, VNodeRef, watchSyncEffect } from "vue";
import { StateEffect } from "@codemirror/state";
import { docSizePlugin } from "@codewrapper/core";

export const useCodeEditorState = (initialState: string) => {
  const _value = ref(initialState);

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

  const callbackRef: VNodeRef = (({ view }: { view: EditorView }) => {
    const realView = unref(view);
    const transaction = realView.state.update({
      effects: StateEffect.appendConfig.of([
        docSizePlugin((val) => (_value.value = val)),
      ]),
    });
    realView.dispatch(transaction);
    viewRef.value = realView;
  }) as never;

  return { value, ref: callbackRef };
};
