import { useState } from "react";
import type { ReactNode } from "react";

import Sidebar from "./Sidebar";

import DashboardHeader from "@/components/features/dashboard/DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden font-display text-slate-800 antialiased selection:bg-blue-500/20 selection:text-blue-700">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
      />
      <main className="relative flex flex-1 flex-col overflow-hidden bg-slate-50 bg-dot-pattern">
        <DashboardHeader onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <div className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
