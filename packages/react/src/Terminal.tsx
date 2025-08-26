import { initTerm } from "@codewrapper/core";
import { forwardRef, useCallback, useLayoutEffect, useState } from "react";
import { assignRef } from "./utils";
import { Terminal as XTermTerminal } from "@xterm/xterm";

export const Terminal = forwardRef<XTermTerminal>((_, ref) => {
  const [containerEl, setContainerEl] = useState<HTMLDivElement>();

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
    <div
      ref={useCallback((view: HTMLDivElement) => setContainerEl(view), [])}
    />
  );
});
