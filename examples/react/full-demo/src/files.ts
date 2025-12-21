import { FileSystemTree } from "@webcontainer/api";

export const files: FileSystemTree = {
  "README.md": {
    file: {
      contents: `
# WebContainers React Full Demo

This is a full demo of Codewrapper using React and WebContainers.

## Features

- Code editor with syntax highlighting
- Terminal to run commands
- Live preview of the application

## Getting Started

1. Edit the files in the code editor.
2. Use the terminal to install dependencies (\`npm install\`) and start the application (\`npm start\`).
3. View the live preview in the iframe.
`,
    },
  },
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
