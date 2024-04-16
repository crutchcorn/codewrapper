import { Terminal as TerminalBase } from "@codewrapper/templating-base/react";
import { initTerm, CodeBlocksTerminal } from "@codewrapper/core";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { PromptFn } from "@codewrapper/core/src";
import { assignRef } from "./utils";

interface TerminalProps {
  /** To avoid re-rendering the terminal, you need to wrap this property in a `useCallback` hook. */
  onPrompt: PromptFn;
}

interface TerminalRef {
  term: CodeBlocksTerminal;
  prompt: (term: CodeBlocksTerminal) => void;
}

export const Terminal = forwardRef<TerminalRef, TerminalProps>((props, ref) => {
  const [containerEl, setContainerEl] = useState<HTMLElement>();

  useLayoutEffect(() => {
    if (!containerEl) return;
    const termObj = initTerm(props.onPrompt);
    if (ref) assignRef(ref, termObj);
    termObj.term.open(containerEl);
    return () => {
      termObj.term.dispose();
    };
  }, [containerEl, props.onPrompt]);

  return (
    <TerminalBase
      ref={useCallback((view: HTMLElement) => setContainerEl(view), [])}
    />
  );
});
