import { Flame } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import type { StreakData } from "@/types/dashboard";

interface KaizenStreakBannerProps {
  data: StreakData;
}

export default function KaizenStreakBanner({ data }: KaizenStreakBannerProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
        <Flame size={22} weight="fill" />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t("dashboard.streak.title")}
        </p>
        <p
          className="text-lg font-bold text-slate-900"
          data-testid="streak-count"
        >
          {t("dashboard.streak.days", { count: data.currentStreak })}
        </p>
      </div>
      <div className="ml-auto text-right">
        <p className="text-xs font-medium text-slate-500">
          {t("dashboard.streak.best", { count: data.bestStreak })}
        </p>
      </div>
    </div>
  );
}
