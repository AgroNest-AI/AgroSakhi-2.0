import { createRoot } from "react-dom/client";
import { AppProvider } from "./contexts/AppContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "@/components/ui/tooltip";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </QueryClientProvider>
  </AppProvider>
);
