import { Terminal } from "@xterm/xterm";

export type CodeBlocksTerminal = Terminal & {
  _initialized: boolean;
  prompt: (term: CodeBlocksTerminal) => void;
};

export type PromptFn = (term: CodeBlocksTerminal, text: string) => boolean;

// Cancel wheel events from scrolling the page if the terminal has scrollback
/*
function preventScroll(term: Terminal) {
  document.querySelector('.xterm').addEventListener('wheel', e => {
    if (term.buffer.active.baseY > 0) {
      e.preventDefault();
    }
  });
}
*/

export function initTerm(onPrompt: PromptFn) {
  const term = new Terminal({
    cursorBlink: true,
    allowProposedApi: true,
  }) as CodeBlocksTerminal;

  let command = "";

  function prompt(term: CodeBlocksTerminal) {
    command = "";
    term.write("\r\n$ ");
  }

  function runCommand(term: CodeBlocksTerminal, text: string) {
    const command = text.trim().split(" ")[0];
    if (command.length > 0) {
      term.writeln("");
      const commandFound = onPrompt(term, text);
      if (commandFound) return;
      term.writeln(`${command}: command not found`);
    }
    prompt(term);
  }

  function runFakeTerminal() {
    if (term._initialized) {
      return;
    }

    term._initialized = true;

    term.prompt = () => {
      term.write("\r\n$ ");
    };

    prompt(term);

    term.onData((e) => {
      switch (e) {
        case "\u0003": // Ctrl+C
          term.write("^C");
          prompt(term);
          break;
        case "\r": // Enter
          runCommand(term, command);
          command = "";
          break;
        case "\u007F": // Backspace (DEL)
          // Do not delete the prompt
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((term as any)._core.buffer.x > 2) {
            term.write("\b \b");
            if (command.length > 0) {
              command = command.substr(0, command.length - 1);
            }
          }
          break;
        default: // Print all other characters for demo
          if (
            (e >= String.fromCharCode(0x20) &&
              e <= String.fromCharCode(0x7e)) ||
            e >= "\u00a0"
          ) {
            command += e;
            term.write(e);
          }
      }
    });
  }

  runFakeTerminal();

  return { term, prompt };
}
