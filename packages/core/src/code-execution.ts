import {
  FileSystemTree,
  WebContainer,
  WebContainerProcess,
} from "@webcontainer/api";
import { Terminal } from "@xterm/xterm";
import { Store } from "@tanstack/store";

export async function initCodeExecution(files: FileSystemTree) {
  const container = await WebContainer.boot();
  await container.mount(files);

  const serverData = new Store<{ port: number; url: string } | null>(null);

  container.on("server-ready", (port, url) => {
    serverData.setState(() => ({ port, url }));
  });

  return { container, serverData };
}

export async function startShellAndAttachToTerminal(
  webContainer: WebContainer,
  terminal: Terminal,
) {
  const shellProcess = await webContainer.spawn("jsh", {
    terminal: {
      cols: terminal.cols,
      rows: terminal.rows,
    },
  });

  shellProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      },
    }),
  );

  const input = shellProcess.input.getWriter();

  terminal.onData((data) => {
    input.write(data);
  });

  return shellProcess;
}

/**
 * Requires access to the DOM
 * Used in conjunction with `fitTerm`
 *
 * Must be called **after** `fitTerm`
 */
export function fitShell(
  shellProcess: WebContainerProcess,
  terminal: Terminal,
) {
  function resizeShell() {
    shellProcess.resize({
      cols: terminal.cols,
      rows: terminal.rows,
    });
  }

  window.addEventListener("resize", resizeShell);

  return { cleanup: () => window.removeEventListener("resize", resizeShell) };
}
