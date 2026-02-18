import { useTranslation } from "react-i18next";

import StatusCard from "./StatusCard";

import type { SubmissionStatusData } from "@/types/dashboard";

interface SubmissionStatusSectionProps {
  statuses: SubmissionStatusData[];
}

export default function SubmissionStatusSection({
  statuses,
}: SubmissionStatusSectionProps) {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-slate-900">
        {t("dashboard.statuses.title")}
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {statuses.map((status) => (
          <StatusCard key={status.labelKey} data={status} />
        ))}
      </div>
    </div>
  );
}
