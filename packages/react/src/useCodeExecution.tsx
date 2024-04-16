import { QueryClient, useQuery } from "@tanstack/react-query";
import { Store, useStore } from "@tanstack/react-store";
import {
  fitShell,
  fitTerm,
  initCodeExecution,
  startShellAndAttachToTerminal,
} from "@codewrapper/core";
import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Terminal as XTermTerminal } from "@xterm/xterm";
import * as React from "react";

const qc = new QueryClient({
  defaultOptions: {
    mutations: {
      gcTime: 0,
    },
    queries: {
      gcTime: 0,
      staleTime: 0,
    },
  },
});

const noopStore = new Store<{ port: number; url: string } | null>(null);

export function useCodeExecution(files: FileSystemTree) {
  const containerRef = useRef<WebContainer>();
  const { data } = useQuery(
    {
      queryKey: ["web_container"],
      queryFn: async () => {
        if (containerRef.current) containerRef.current.teardown();
        const data = await initCodeExecution(files);
        containerRef.current = data.container;
        return data;
      },
      structuralSharing: false,
      throwOnError: true,
    },
    qc,
  );

  const iframeUrl = useStore(
    data?.serverData ?? noopStore,
    (data) => data?.url ?? null,
  );

  // Optional, if not used, then you'll need to manage `container` manually
  const [terminal, setTerminal] = useState<XTermTerminal | null>(null);

  useEffect(() => {
    const cleanupFn = { current: null as null | (() => void) };
    async function attachTerm() {
      if (!terminal || !data) return;

      const shellProcess = await startShellAndAttachToTerminal(
        data.container,
        terminal,
      );
      const cleanupFitTerm = fitTerm(terminal);
      const cleanupFitShell = fitShell(shellProcess, terminal);
      cleanupFn.current = () => {
        cleanupFitTerm.cleanup();
        cleanupFitShell.cleanup();
        shellProcess.kill();
      };
    }

    attachTerm();
    return () => cleanupFn.current?.();
  }, [data, terminal]);

  const terminalRef = useCallback((term: XTermTerminal) => {
    setTerminal(term);
  }, []);

  return { terminalRef, iframeUrl, container: data?.container };
}
