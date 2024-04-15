import {
  docSizePlugin,
  getCodeEditorState,
  setCodeEditorElement,
} from "@codewrapper/core";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

const el = document.createElement("div");
const preEl = document.createElement("pre");

const view = setCodeEditorElement(el, getCodeEditorState());

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

document.body.append(el);
document.body.append(preEl);
