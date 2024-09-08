import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { QueryClient } from "@tanstack/react-query";
import Sidebar from "../components/Sidebar";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <div className="flex gap-4 h-screen p-4 bg-stone-50">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* <ReactQueryDevtools buttonPosition="top-right" /> */}
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </div>
  );
}
