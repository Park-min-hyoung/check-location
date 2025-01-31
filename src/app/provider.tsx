import * as React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

import { isDevelopment } from "@/config/envs";
// import { AuthLoader } from "@/lib/auth";
import { queryConfig } from "@/lib/react-query";
import { defaultToastifyOptions } from "@/lib/react-toastify";
import { MainErrorFallback } from "@/components/errors/main";
import { Spinner } from "@/components/ui/spinner";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: queryConfig })
  );

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {isDevelopment && <ReactQueryDevtools />}
            <ToastContainer {...defaultToastifyOptions} />
            {children}
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
