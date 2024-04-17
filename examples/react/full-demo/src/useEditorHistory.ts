import * as React from "react";
import { historyField } from "@codemirror/commands";
import { EditorState, Extension } from "@codemirror/state";
import { MutableRefObject } from "react";
import { EditorView } from "@codemirror/view";

interface UseEditorHistoryProps {
  // Mutable via useState
  filePath: string | undefined | null;
  // Stored via a useRef, do not change this reference
  editorViewRef: MutableRefObject<EditorView | undefined>;
  // Intended to all be memoized via useMemo or whatnot
  getPathValue: () => Promise<string>;
  getExtensions: () => Promise<Extension[]>;
}

/**
 * This plugin allows us to have editor history that's preserved for
 * each dedicated file. This means that if you have two files and modify one
 * the history from that file will not leak into the other file
 */
export const useEditorHistory = ({
  filePath,
  getPathValue,
  getExtensions,
  editorViewRef,
}: UseEditorHistoryProps) => {
  const editorStateMap = React.useMemo(() => new Map<string, string>(), []);

  const prevFilePath = React.useRef<string>();

  React.useEffect(() => {
    async function updateEditor() {
      const editorView = editorViewRef.current;
      if (!filePath || !editorView) return;

      const extensions = await getExtensions();

      if (prevFilePath.current) {
        editorStateMap.set(
          prevFilePath.current,
          editorView.state.toJSON({
            history: historyField,
          }),
        );
      }

      const prevEditorState = editorStateMap.get(filePath);

      const docState = await getPathValue();

      editorView.setState(
        prevEditorState
          ? EditorState.fromJSON(
              prevEditorState,
              {
                extensions,
                doc: docState,
              },
              {
                history: historyField,
              },
            )
          : EditorState.create({
              doc: docState || "",
              extensions,
            }),
      );

      prevFilePath.current = filePath;
    }

    updateEditor();
  }, [filePath, getExtensions]);
};
