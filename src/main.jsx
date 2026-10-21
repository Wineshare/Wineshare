import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

document.documentElement.classList.remove("no-js");

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

const root = document.getElementById("root");
// Pages pré-rendues en production : on « hydrate » le HTML existant
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
