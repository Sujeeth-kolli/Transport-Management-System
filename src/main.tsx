import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { StopsProvider } from "./content/applications/Stops/StopsContext.tsx";
import { SidebarProvider } from "./contexts/SidebarContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <StopsProvider>
            <App />
          </StopsProvider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
    ,
  </React.StrictMode>
);
