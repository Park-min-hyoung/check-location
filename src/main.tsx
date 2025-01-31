import React from "react";

import { App } from "@/app/index.tsx";
import ReactDOM from "react-dom/client";

import "@/index.css";

import { enableMocking } from "@/testing/mocks/index";

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
