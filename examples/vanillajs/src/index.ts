import "@xterm/xterm/css/xterm.css";
import {
  docSizePlugin,
  getCodeEditorState,
  initTerm,
  PromptFn,
  setCodeEditorElement,
} from "@codewrapper/core";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

const codeEditorEl = document.createElement("div");
const preEl = document.createElement("pre");

const view = setCodeEditorElement(codeEditorEl, getCodeEditorState());

const initialState = "<div>Test</div>\n\nTesting";

const transaction = view.state.update({
  effects: StateEffect.appendConfig.of([
    basicSetup,
    docSizePlugin((val) => (preEl.innerText = val)),
  ]),
  changes: {
    from: 0,
    to: view.state.doc.length,
    insert: initialState,
  },
});
view.dispatch(transaction);

preEl.innerText = initialState;

const onPrompt: PromptFn = (term, text) => {
  const command = text.trim().split(" ")[0];
  if (command === "ls") {
    term.writeln(["a", "bunch", "of", "fake", "files"].join("\r\n"));
    term.prompt(term);
    return true;
  }
  return false;
};

const { term, prompt } = initTerm(onPrompt);

term.writeln("Below is a simple emulated backend, try running `help`.");
prompt(term);

const termEl = document.createElement("div");
term.open(termEl);

const parent = document.querySelector("#root") as HTMLElement;

parent.appendChild(codeEditorEl);
parent.appendChild(preEl);
parent.appendChild(termEl);
