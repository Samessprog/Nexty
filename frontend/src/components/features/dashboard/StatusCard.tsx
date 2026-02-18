import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import type { SubmissionStatusData } from "@/types/dashboard";

interface StatusCardProps {
  data: SubmissionStatusData;
}

export default function StatusCard({ data }: StatusCardProps) {
  const { t } = useTranslation();
  const IconComponent = data.icon;

  return (
    <button
      className={cn(
        "group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:shadow-md",
        `hover:border-${data.colorScheme.hoverBorder}`,
        data.dimmed && "opacity-75 hover:opacity-100",
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
            data.colorScheme.bg,
            data.colorScheme.text,
            `group-hover:${data.colorScheme.hoverBg}`,
            `group-hover:${data.colorScheme.hoverText}`,
          )}
        >
          <IconComponent size={18} />
        </div>
        <span className="font-mono text-xl font-bold text-slate-900">
          {data.count}
        </span>
      </div>
      <span
        className={cn("text-sm font-medium text-slate-600 whitespace-nowrap")}
      >
        {t(data.labelKey)}
      </span>
    </button>
  );
}
