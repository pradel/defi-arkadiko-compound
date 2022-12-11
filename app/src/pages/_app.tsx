import type { AppProps } from "next/app";
import { ClientProvider } from "@micro-stacks/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientProvider appName="Nextjs + Microstacks" appIconUrl="/vercel.png">
        <Component {...pageProps} />
      </ClientProvider>
    </QueryClientProvider>
  );
}
