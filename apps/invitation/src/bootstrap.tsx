import React from "react";
import { createRoot } from "react-dom/client";
import { ApiProvider } from "@wedding/api-client";
import App from "@/app/App";
import "@wedding/ui/styles.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>,
);
