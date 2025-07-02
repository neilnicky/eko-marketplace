"use client"

import AppHeader from "@/components/common/AppHeader";
import "./globals.css";
import BottomNavBar from "@/components/common/BottomNavBar";
import { CreateFab } from "@/components/common/CreateFab";
import StoreProvider from "./StoreProvider";
import { preventFoucScript } from "@/lib/scripts/preventFouc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background`}>
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <AppHeader />
            <div className="my-16 max-w-7xl mx-auto">{children}</div>
            <BottomNavBar />
            <CreateFab />
          </StoreProvider>
          <script dangerouslySetInnerHTML={{ __html: preventFoucScript }} />
          {/* <Script id="prevent-fouc" strategy="beforeInteractive">
          {preventFoucScript}
          </Script> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
