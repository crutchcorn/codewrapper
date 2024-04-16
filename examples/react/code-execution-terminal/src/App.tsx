import * as React from "react";
import {
  initCodeExecution,
  Terminal,
  startShellAndAttachToTerminal,
  fitShell,
  fitTerm,
} from "@codewrapper/react";
import { Terminal as XTermTerminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { FileSystemTree } from "@webcontainer/api";

const files: FileSystemTree = {
  "index.js": {
    file: {
      contents: `
import express from 'express';
const app = express();
const port = 3111;
  
app.get('/', (req, res) => {
    res.send('Welcome to a WebContainers app! 🥳');
});
  
app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
});`,
    },
  },
  "package.json": {
    file: {
      contents: `
          {
            "name": "example-app",
            "type": "module",
            "dependencies": {
              "express": "latest",
              "nodemon": "latest"
            },
            "scripts": {
              "start": "nodemon index.js"
            }
          }`,
    },
  },
};

export default function App() {
  const [iframeUrl, setIFrameUrl] = React.useState("");

  const cleanupFn = React.useRef<() => void>();

  const terminalRef = React.useMemo(
    () => async (term: XTermTerminal) => {
      if (!term) return;

      const { container, serverData } = await initCodeExecution(files);
      if (serverData.state) {
        setIFrameUrl(serverData.state.url);
      }
      const cleanupServerData = serverData.subscribe(() => {
        if (!serverData.state) return;
        setIFrameUrl(serverData.state.url);
      });
      const shellProcess = await startShellAndAttachToTerminal(container, term);
      const cleanupFitTerm = fitTerm(term);
      const cleanupFitShell = fitShell(shellProcess, term);
      cleanupFn.current = () => {
        cleanupServerData();
        cleanupFitTerm.cleanup();
        cleanupFitShell.cleanup();
        shellProcess.kill();
        container.teardown();
      };
    },
    [],
  );

  React.useEffect(() => {
    if (!cleanupFn.current) return;
    cleanupFn.current();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexBasis: "50%" }}>
        {iframeUrl && <iframe src={iframeUrl} />}
      </div>
      <div style={{ flexBasis: "50%" }}>
        <Terminal ref={terminalRef} />
      </div>
    </div>
  );
}
