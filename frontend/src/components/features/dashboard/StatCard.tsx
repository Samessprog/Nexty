import { Minus, TrendDown, TrendUp } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import type { StatCardData } from "@/types/dashboard";

interface StatCardProps {
  data: StatCardData;
}

export default function StatCard({ data }: StatCardProps) {
  const { t } = useTranslation();
  const IconComponent = data.icon;

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-lg p-2 ${data.iconBg} ${data.iconColor}`}>
          <IconComponent size={20} />
        </div>
        {data.badge ? (
          <span
            className={
              data.badge.variant === "success"
                ? "flex items-center gap-1 rounded bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
                : "text-xs text-slate-400"
            }
            data-testid="stat-badge"
          >
            {data.badge.icon ? <data.badge.icon size={14} /> : null}
            {t(data.badge.text)}
          </span>
        ) : null}
      </div>
      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-500">
          {t(data.labelKey)}
        </p>
        <h3 className="font-mono text-3xl font-bold text-slate-900">
          {data.value}
        </h3>
        {data.trend ? (
          <div
            className={cn(
              "mt-1.5 flex items-center gap-1 text-xs font-medium",
              data.trend.direction === "up" && "text-green-600",
              data.trend.direction === "down" && "text-red-600",
              data.trend.direction === "flat" && "text-slate-400",
            )}
            data-testid="stat-trend"
          >
            {data.trend.direction === "up" && <TrendUp size={14} />}
            {data.trend.direction === "down" && <TrendDown size={14} />}
            {data.trend.direction === "flat" && <Minus size={14} />}
            <span>{t(data.trend.valueKey)}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}
