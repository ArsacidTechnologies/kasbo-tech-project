"use client";

// import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    // <Provider store={store}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    // </Provider>
  );
}
