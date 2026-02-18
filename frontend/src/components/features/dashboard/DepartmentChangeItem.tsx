import { useTranslation } from "react-i18next";

import type { DepartmentChangeData } from "@/types/dashboard";

interface DepartmentChangeItemProps {
  data: DepartmentChangeData;
  isLast?: boolean;
}

export default function DepartmentChangeItem({
  data,
  isLast = false,
}: DepartmentChangeItemProps) {
  const { t } = useTranslation();

  return (
    <li
      className={`relative border-l pl-6 pb-2 ${isLast ? "border-transparent" : "border-slate-100"}`}
    >
      <span
        className={`absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 ${data.colorScheme.bg} ${data.colorScheme.border}`}
      />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-slate-800">
          {t(data.authorKey)}
        </p>
        <p className="text-xs text-slate-500">{t(data.descriptionKey)}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
            {t(data.departmentKey)}
          </span>
          <span className="text-[10px] text-slate-400">{t(data.timeKey)}</span>
        </div>
      </div>
    </li>
  );
}
