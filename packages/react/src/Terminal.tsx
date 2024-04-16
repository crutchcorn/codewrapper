import { Terminal as TerminalBase } from "@codewrapper/templating-base/react";
import { initTerm } from "@codewrapper/core";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { assignRef } from "./utils";
import { Terminal as XTermTerminal } from "@xterm/xterm";

export const Terminal = forwardRef<XTermTerminal>((_, ref) => {
  const [containerEl, setContainerEl] = useState<HTMLElement>();

  useLayoutEffect(() => {
    if (!containerEl) return;
    const term = initTerm();
    if (ref) assignRef(ref, term);
    term.open(containerEl);
    return () => {
      term.dispose();
    };
  }, [containerEl]);

  return (
    <TerminalBase
      ref={useCallback((view: HTMLElement) => setContainerEl(view), [])}
    />
  );
});
