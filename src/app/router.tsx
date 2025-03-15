import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { paths } from "@/config/paths";
//import { ProtectedRoute} from '@/lib/auth'

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from "./routes/app/root";

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: "/",
      lazy: () => import("./auth/auth-layout").then(convert(queryClient)),
    },
    {
      path: "/messenger",
      lazy: () =>
        import("./messenger/messenger-layout").then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import("./auth/auth-layout").then(convert(queryClient)),
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};
