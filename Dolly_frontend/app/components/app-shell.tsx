"use client";

import * as React from "react";
import Aside from "./navigation";
import MobileNavigation from "./mobilenavigation";
import ProjectModal from "./modals/ProjectModal";

const SIDEBAR_COOKIE_NAME = "sidebar-collapsed";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function AppShell({
  children,
  initialCollapsed,
}: {
  children: React.ReactNode;
  initialCollapsed: boolean;
}) {
  const [sidebarCollapsed, setSidebarCollapsedState] =
    React.useState(initialCollapsed);

  const setSidebarCollapsed = React.useCallback((v: boolean) => {
    setSidebarCollapsedState(v);
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${v}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
  }, []);

  return (
    <div
      className={[
        "grid h-screen min-h-0  grid-cols-1 overflow-hidden transition-[grid-template-columns] duration-200",
        sidebarCollapsed
          ? "lg:grid-cols-[5rem_minmax(0,1fr)]"
          : "lg:grid-cols-[18rem_minmax(0,1fr)]",
      ].join(" ")}
    >
      <Aside
        collapsed={sidebarCollapsed}
        onCollapsedChange={setSidebarCollapsed}
      />

      <main className="min-h-0 min-w-0 overflow-hidden relative">
        <ProjectModal />
        {children}
        <MobileNavigation />
      </main>
    </div>
  );
}
