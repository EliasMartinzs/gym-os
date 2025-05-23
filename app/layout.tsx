import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-client-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import { ExpandablePanel } from "@/components/reusable/expandable-panel";

export const metadata: Metadata = {
  title: "Gym OS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}
              <Toaster richColors position="top-right" />
              <ExpandablePanel />
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
