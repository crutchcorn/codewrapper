import "@xterm/xterm/css/xterm.css";
import { initTerm, PromptFn } from "./lib";

// TODO: Move to app, not library
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

const el = document.querySelector("#root") as HTMLElement;

term.open(el);
