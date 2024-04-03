import { getState, setElement } from "@codewrapper/core";
import { StateEffect } from "@codemirror/state";
import { basicSetup } from "codemirror";

const el = document.createElement("div");

const view = setElement(el, getState());
const transaction = view.state.update({
  effects: StateEffect.appendConfig.of(basicSetup),
});
view.dispatch(transaction);

document.body.append(el);
