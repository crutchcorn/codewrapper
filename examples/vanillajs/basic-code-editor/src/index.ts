import {
  docSizePlugin,
  getCodeEditorState,
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

const parent = document.querySelector("#root") as HTMLElement;

parent.appendChild(codeEditorEl);
parent.appendChild(preEl);
