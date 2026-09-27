"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="default"
      enableSystem={false}
      themes={[
        "focus",
        "plan",
        "fresh-start",
        "priorities",
        "goals",
        "calm",
        "night-shift",
        "deep-work",
        "calm-focus",
        "deadline",
        "after-hours",
        "minimal",
        "default",
      ]}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
