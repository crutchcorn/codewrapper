import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";

export function initTerm() {
  const term = new Terminal({
    cursorBlink: true,
    allowProposedApi: true,
  }) as Terminal;

  return term;
}

export type FakeTerminal = Terminal & {
  _initialized: boolean;
  prompt: () => void;
};

// Return "true" for "a command was found" or "false" for "no command was found"
export type PromptFn = (term: FakeTerminal, text: string) => boolean;

export function attachFakeTerm(_term: Terminal, onPrompt: PromptFn) {
  const term = _term as FakeTerminal;

  let command = "";

  function prompt() {
    command = "";
    term.write("\r\n$ ");
  }

  function runCommand(term: FakeTerminal, text: string) {
    const command = text.trim().split(" ")[0];
    if (command.length > 0) {
      term.writeln("");
      const commandFound = onPrompt(term, text);
      if (commandFound) return;
      term.writeln(`${command}: command not found`);
    }
    prompt();
  }

  function runFakeTerminal() {
    if (term._initialized) {
      return;
    }

    term._initialized = true;

    term.prompt = () => {
      term.write("\r\n$ ");
    };

    prompt();

    term.onData((e) => {
      switch (e) {
        case "\u0003": // Ctrl+C
          term.write("^C");
          prompt();
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

  return prompt;
}

/**
 * Requires access to the DOM
 */
export function fitTerm(term: Terminal) {
  const fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  fitAddon.fit();

  function resizeTerm() {
    fitAddon.fit();
  }

  window.addEventListener("resize", resizeTerm);
  return { cleanup: () => window.removeEventListener("resize", resizeTerm) };
}

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
