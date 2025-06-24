import AppHeader from "@/components/app-header/AppHeader";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased bg-background`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      // Prevent FOUC by applying theme before page renders
      (function() {
        const theme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (theme === 'dark' || (!theme && prefersDark)) {
          document.documentElement.classList.add('dark');
        }
      })();
    `,
          }}
        />
        <AppHeader />
        {children}
      </body>
    </html>
  );
}
