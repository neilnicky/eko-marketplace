import AppHeader from "@/components/common/AppHeader";
import "./globals.css";
import BottomNavBar from "@/components/common/BottomNavBar";
import { CreateFab } from "@/components/common/CreateFab";
import StoreProvider from "./StoreProvider";
import { preventFoucScript } from "@/lib/scripts/preventFouc";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background`}>
        <StoreProvider>
          <AppHeader />
          <div className="mt-14">{children}</div>
          <BottomNavBar />
          <CreateFab />
        </StoreProvider>
        <script dangerouslySetInnerHTML={{ __html: preventFoucScript }} />
        {/* <Script id="prevent-fouc" strategy="beforeInteractive">
          {preventFoucScript}
        </Script> */}
      </body>
    </html>
  );
}
