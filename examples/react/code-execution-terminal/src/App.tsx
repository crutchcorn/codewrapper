import * as React from "react";
import { Terminal, useCodeExecution } from "@codewrapper/react";
import "@xterm/xterm/css/xterm.css";
import { files } from "./files";

export default function App() {
  const { terminalRef, iframeUrl } = useCodeExecution(files);

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
