import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { createBrowserRouter} from 'react-router';
import { RouterProvider } from 'react-router/dom';

import {paths} from '@/config/paths'
//import { ProtectedRoute} from '@/lib/auth'

import {
    default as AppRoot,
    ErrorBoundary as AppRootErrorBoundary,
  } from './routes/app/root';

const convert = (queryClient: QueryClient) => (m:any) =>{
    const { clientLoader, clientAction, default: Component, ...rest } = m;
    return {
        ...rest, 
        loader: clientLoader?.(queryClient), 
        action: clientAction?.(queryClient),
        Component,
    }
};

export const createAppRouter = (queryClient: QueryClient) => {
    createBrowserRouter([
        // {
        //     path: paths.auth.login.path,
        //     lazy: () => import('./routes/auth/login').then(convert(queryClient)),
        //   },
        {
            path: '*',
            lazy: () => import('./routes/not-found').then(convert(queryClient)),
          },
          {
            path: paths.app.root.path,
            element: (
                <AppRoot/>
                // <ProtectedRoute>
                //   <AppRoot />
                // </ProtectedRoute>
              ),
              ErrorBoundary: AppRootErrorBoundary,
            children: [
              
              {
                // path: paths.app.dashboard.path,
                // lazy: () =>
                //   import('./routes/app/dashboard').then(convert(queryClient)),
              },
            ],
          },
    ])
};


export const AppRouter = () => {
    const queryClient = useQueryClient();

    const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
    return <RouterProvider router={router}/>;
}