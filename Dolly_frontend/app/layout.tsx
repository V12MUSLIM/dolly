
import { Plus_Jakarta_Sans } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import AppShell from "./components/app-shell";
import { ToastProvider } from "@heroui/react";
import { Metadata } from "next";
import ProjectModal from "./components/modals/ProjectModal";

export const metadata: Metadata = {
  title: "Dolly",
  description: "Your productivity app",

  openGraph: {
    title: "Dolly",
    description: "Your productivity app",
    images: ["/siteIcon.png"],
  },
};
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialCollapsed =
    cookieStore.get("sidebar-collapsed")?.value === "true";

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable}  h-full antialiased`}
    >
      <body className="relative h-screen overflow-y-auto bg-background text-foreground">
        <Providers>
          <div className="relative z-10 h-full min-h-0">
            <AppShell initialCollapsed={initialCollapsed}>
              <main className="h-full min-h-0 overflow-hidden">{children}</main>
            
              <ToastProvider placement="bottom end" />
            </AppShell>
          </div>
        </Providers>
      </body>
    </html>
  );
}
