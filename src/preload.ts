/* eslint-disable @typescript-eslint/no-explicit-any */
// All of the Node.js APIs are available in the preload process.

import { ipcRenderer } from "electron";

// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type as keyof NodeJS.ProcessVersions]);
  }
});


export const manager = {
  auth: {
    biometric: async (): Promise<any> => await ipcRenderer.send('auth:biometric'),
  },
};

window.manager = manager;