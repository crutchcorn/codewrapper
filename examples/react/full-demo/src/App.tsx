import * as React from "react";
import {
  CodeEditor,
  Terminal,
  useCodeExecution,
  docUpdaterPlugin,
} from "@codewrapper/react";
import { EditorView } from "@codemirror/view";
import { EditorState, StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";
import "@xterm/xterm/css/xterm.css";
import { files } from "./files";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { LanguageDescription, LanguageSupport } from "@codemirror/language";
import { languages } from "@codemirror/language-data";
import { historyField } from "@codemirror/commands";

const qc = new QueryClient();

export default function App() {
  const { terminalRef, iframeUrl, container } = useCodeExecution(files);

  const { data: fileList } = useQuery(
    {
      queryKey: ["file_list"],
      queryFn: async () => {
        return await container!.fs.readdir("/");
      },
      enabled: !!container,
    },
    qc,
  );

  // If null, no file is selected
  const [filePath, setFilePath] = React.useState<string | null>(null);

  const editorStateMap = React.useMemo(() => new Map<string, string>(), []);

  const editorViewRef = React.useRef<EditorView>();

  // TODO: Compartment to store extensions without recalculation?
  const getExtensions = React.useMemo(
    () => async () => {
      const languageDescription = filePath
        ? LanguageDescription.matchFilename(
            languages,
            // TODO: Only get filename, not path
            filePath,
          )
        : null;

      const languageSupport: null | LanguageSupport =
        (await languageDescription?.load()) ?? null;

      return [
        basicSetup,
        // TODO: Rename this plugin
        docUpdaterPlugin((val) => {
          if (!dataRef.current.container) return;
          if (!dataRef.current.filePath) return;
          dataRef.current.container.fs.writeFile(dataRef.current.filePath, val);
        }),
        ...(languageSupport ? [languageSupport] : []),
      ];
    },
    [filePath],
  );

  const prevFilePath = React.useRef<string>();

  React.useEffect(() => {
    async function updateEditor() {
      const editorView = editorViewRef.current;
      if (!filePath || !editorView || !container) return;

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

      const docState = await container.fs.readFile(filePath, "utf8");

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
  }, [filePath, container, getExtensions]);

  const dataRef = React.useRef({ container, filePath });

  dataRef.current = { container, filePath };

  async function codeEditorRef(editor: EditorView) {
    if (!editor) return;
    editorViewRef.current = editor;
    const extensions = await getExtensions();
    const transaction = editor.state.update({
      effects: StateEffect.appendConfig.of(extensions),
    });
    editor.dispatch(transaction);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ flexBasis: "20%", display: "flex", flexDirection: "row" }}>
        {fileList?.map((file) => {
          return (
            <p key={file} onClick={() => setFilePath(file)}>
              {file}
            </p>
          );
        })}
      </div>
      <div style={{ flexBasis: "50%" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flexBasis: "50%" }}>
            <CodeEditor ref={codeEditorRef} />
          </div>
          <div style={{ flexBasis: "50%" }}>
            {iframeUrl && <iframe src={iframeUrl} />}
          </div>
        </div>
      </div>
      <div style={{ flexBasis: "30%" }}>
        <Terminal ref={terminalRef} />
      </div>
    </div>
  );
}
