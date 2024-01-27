import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={"THIS PAGE IS LOADING... STAND BY"}>
      <App />
    </Suspense>
  </React.StrictMode>
);
