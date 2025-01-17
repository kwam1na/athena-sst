import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import "./index.css";
import React from "react";
import { Toaster } from "./components/ui/sonner";
import { CurrencyProvider } from "./components/providers/currency-provider";
import { UserProvider } from "./contexts/UserContext";
import { StoreModal } from "./components/ui/modals/store-modal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <CurrencyProvider>
        <UserProvider>
          <Toaster />
          <RouterProvider router={router} />
          {/* <StoreModal /> */}
        </UserProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
