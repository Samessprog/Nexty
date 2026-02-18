import { DotsThree } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import ActivityItem from "./ActivityItem";
import DepartmentChangeItem from "./DepartmentChangeItem";

import type { ActivityItemData, DepartmentChangeData } from "@/types/dashboard";
import { cn } from "@/lib/utils";

type ActiveTab = "myActivity" | "departmentChanges";

interface ActivityFeedProps {
  items: ActivityItemData[];
  departmentChanges: DepartmentChangeData[];
}

export default function ActivityFeed({
  items,
  departmentChanges,
}: ActivityFeedProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ActiveTab>("myActivity");

  return (
    <div className="flex h-[400px] flex-col rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 pt-4 pb-0">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("myActivity")}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === "myActivity"
                ? "border-b-2 border-slate-900 font-bold text-slate-900"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {t("dashboard.activity.tabMyActivity")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("departmentChanges")}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === "departmentChanges"
                ? "border-b-2 border-slate-900 font-bold text-slate-900"
                : "text-slate-400 hover:text-slate-600",
            )}
          >
            {t("dashboard.activity.tabDepartment")}
          </button>
        </div>
        <button
          className="mb-3 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="More options"
          data-testid="activity-more"
        >
          <DotsThree size={20} weight="bold" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "myActivity" ? (
          <ul className="space-y-4">
            {items.map((item, index) => (
              <ActivityItem
                key={item.titleKey}
                data={item}
                isLast={index === items.length - 1}
              />
            ))}
          </ul>
        ) : (
          <ul className="space-y-4">
            {departmentChanges.map((item, index) => (
              <DepartmentChangeItem
                key={item.descriptionKey}
                data={item}
                isLast={index === departmentChanges.length - 1}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
