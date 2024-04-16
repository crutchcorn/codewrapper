import "@xterm/xterm/css/xterm.css";
import { attachFakeTerm, initTerm, PromptFn } from "@codewrapper/core";

const onPrompt: PromptFn = (term, text) => {
  const command = text.trim().split(" ")[0];
  if (command === "ls") {
    term.writeln(["a", "bunch", "of", "fake", "files"].join("\r\n"));
    term.prompt();
    return true;
  }
  return false;
};

const term = initTerm();

const prompt = attachFakeTerm(term, onPrompt);

term.writeln("Below is a simple emulated backend, try running `help`.");
prompt();

const termEl = document.createElement("div");
term.open(termEl);

const parent = document.querySelector("#root") as HTMLElement;

parent.appendChild(termEl);
