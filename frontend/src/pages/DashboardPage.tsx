import ActivityFeed from "@/components/features/dashboard/ActivityFeed";
import EfficiencyChart from "@/components/features/dashboard/EfficiencyChart";
import KaizenStreakBanner from "@/components/features/dashboard/KaizenStreakBanner";
import StatCard from "@/components/features/dashboard/StatCard";
import SubmissionStatusSection from "@/components/features/dashboard/SubmissionStatusSection";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  activityItems,
  chartData,
  departmentChanges,
  statCards,
  streakData,
  submissionStatuses,
} from "@/data/dashboardMockData";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Kaizen streak banner */}
      <KaizenStreakBanner data={streakData} />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.labelKey} data={card} />
        ))}
      </div>

      {/* Submission status */}
      <SubmissionStatusSection statuses={submissionStatuses} />

      {/* Chart + Activity feed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <EfficiencyChart data={chartData} />
        <ActivityFeed items={activityItems} departmentChanges={departmentChanges} />
      </div>
    </DashboardLayout>
  );
}
