import * as React from "react";
import { PromptFn, Terminal, attachFakeTerm } from "@codewrapper/react";
import { Terminal as XTermTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";

export default function App() {
  const onPrompt: PromptFn = React.useCallback((term, text) => {
    term.writeln(`You typed: ${text}`);
    term.prompt();
    return true;
  }, []);

  function terminalRef(term: XTermTerminal) {
    if (!term) return;
    attachFakeTerm(term, onPrompt);
  }

  return (
    <>
      <h2>Base XTerm Usage</h2>
      <Terminal ref={terminalRef} />
    </>
  );
}
