import { List, Plus } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
}

export default function DashboardHeader({
  onMenuToggle,
}: DashboardHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-200/60 bg-white/60 px-8 py-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle menu"
          data-testid="hamburger-toggle"
        >
          <List size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {t("dashboard.greeting")}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            {t("dashboard.subtitle")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="group flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-white shadow-lg shadow-slate-200 transition-all active:scale-95 hover:bg-slate-800">
          <Plus
            size={20}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
          <span className="text-sm font-semibold">
            {t("dashboard.submitNewIdea")}
          </span>
        </button>
      </div>
    </header>
  );
}
