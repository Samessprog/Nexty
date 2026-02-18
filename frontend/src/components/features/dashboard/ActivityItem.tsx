import { Trans, useTranslation } from "react-i18next";

import type { ActivityItemData } from "@/types/dashboard";

interface ActivityItemProps {
  data: ActivityItemData;
  isLast?: boolean;
}

export default function ActivityItem({
  data,
  isLast = false,
}: ActivityItemProps) {
  const { t } = useTranslation();

  return (
    <li
      className={`relative border-l pl-6 pb-2 ${isLast ? "border-transparent" : "border-slate-100"}`}
    >
      <span
        className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 ${data.colorScheme.bg} ${data.colorScheme.border}`}
        data-testid="activity-dot"
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-slate-800">
          {t(data.titleKey)}
        </p>
        <p className="text-xs text-slate-500">
          <Trans
            i18nKey={data.descriptionKey}
            components={{
              mono: (
                <span className="rounded bg-slate-100 px-1 font-mono text-slate-700" />
              ),
            }}
          />
        </p>
        <span className="mt-1 text-[10px] text-slate-400">
          {t(data.timeKey)}
        </span>
      </div>
    </li>
  );
}
