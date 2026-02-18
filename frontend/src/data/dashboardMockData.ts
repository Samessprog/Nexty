import {
  ArrowUp,
  Check,
  CheckCircle,
  Folders,
  MagnifyingGlass,
  Prohibit,
  Sparkle,
  Star,
  Trophy,
  Wrench,
} from "@phosphor-icons/react";

import type {
  ActivityItemData,
  ChartDataPoint,
  DepartmentChangeData,
  StatCardData,
  StreakData,
  SubmissionStatusData,
} from "@/types/dashboard";

export const statCards: StatCardData[] = [
  {
    icon: Star,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    labelKey: "dashboard.stats.points",
    value: "1,250",
    badge: { text: "dashboard.stats.thisMonth", variant: "success" },
    trend: { direction: "up", valueKey: "dashboard.stats.trend.pointsUp" },
  },
  {
    icon: Trophy,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    labelKey: "dashboard.stats.ranking",
    value: "#14",
    badge: {
      text: "dashboard.stats.positions",
      variant: "success",
      icon: ArrowUp,
    },
    trend: { direction: "up", valueKey: "dashboard.stats.trend.rankingUp" },
  },
  {
    icon: Folders,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    labelKey: "dashboard.stats.submissions",
    value: "24",
    trend: {
      direction: "up",
      valueKey: "dashboard.stats.trend.submissionsUp",
    },
  },
  {
    icon: CheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    labelKey: "dashboard.stats.implemented",
    value: "12",
    badge: { text: "dashboard.stats.successRate", variant: "neutral" },
    trend: {
      direction: "flat",
      valueKey: "dashboard.stats.trend.implementedFlat",
    },
  },
];

export const submissionStatuses: SubmissionStatusData[] = [
  {
    icon: Sparkle,
    labelKey: "dashboard.statuses.new",
    count: 2,
    colorScheme: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      hoverBorder: "blue-300",
      hoverBg: "bg-blue-600",
      hoverText: "text-white",
    },
  },
  {
    icon: MagnifyingGlass,
    labelKey: "dashboard.statuses.inVerification",
    count: 1,
    colorScheme: {
      bg: "bg-orange-50",
      text: "text-orange-600",
      hoverBorder: "orange-300",
      hoverBg: "bg-orange-500",
      hoverText: "text-white",
    },
  },
  {
    icon: Wrench,
    labelKey: "dashboard.statuses.inImplementation",
    count: 4,
    colorScheme: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      hoverBorder: "purple-300",
      hoverBg: "bg-purple-600",
      hoverText: "text-white",
    },
  },
  {
    icon: Check,
    labelKey: "dashboard.statuses.completed",
    count: 12,
    colorScheme: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      hoverBorder: "emerald-300",
      hoverBg: "bg-emerald-600",
      hoverText: "text-white",
    },
  },
  {
    icon: Prohibit,
    labelKey: "dashboard.statuses.rejected",
    count: 3,
    colorScheme: {
      bg: "bg-zinc-100",
      text: "text-zinc-500",
      hoverBorder: "zinc-300",
      hoverBg: "bg-zinc-600",
      hoverText: "text-white",
    },
    dimmed: true,
  },
];

export const chartData: ChartDataPoint[] = [
  {
    monthKey: "dashboard.chart.months.jan",
    total: 5,
    implemented: 2.5,
    avgDays: 14,
  },
  {
    monthKey: "dashboard.chart.months.feb",
    total: 7.5,
    implemented: 3.75,
    avgDays: 12,
  },
  {
    monthKey: "dashboard.chart.months.mar",
    total: 15,
    implemented: 10,
    avgDays: 8,
  },
  {
    monthKey: "dashboard.chart.months.apr",
    total: 17.5,
    implemented: 12.5,
    avgDays: 7,
  },
  {
    monthKey: "dashboard.chart.months.may",
    total: 12.5,
    implemented: 7.5,
    avgDays: 10,
  },
  {
    monthKey: "dashboard.chart.months.jun",
    total: 20,
    implemented: 10,
    avgDays: 6,
  },
];

export const streakData: StreakData = {
  currentStreak: 7,
  bestStreak: 14,
};

export const activityItems: ActivityItemData[] = [
  {
    titleKey: "dashboard.activity.ideaAccepted",
    descriptionKey: "dashboard.activity.ideaAcceptedDesc",
    timeKey: "dashboard.activity.time.twoHoursAgo",
    colorScheme: { bg: "bg-emerald-100", border: "border-emerald-500" },
  },
  {
    titleKey: "dashboard.activity.newComment",
    descriptionKey: "dashboard.activity.newCommentDesc",
    timeKey: "dashboard.activity.time.yesterday",
    colorScheme: { bg: "bg-blue-100", border: "border-blue-500" },
  },
  {
    titleKey: "dashboard.activity.actionRequired",
    descriptionKey: "dashboard.activity.actionRequiredDesc",
    timeKey: "dashboard.activity.time.twoDaysAgo",
    colorScheme: { bg: "bg-yellow-100", border: "border-yellow-500" },
  },
  {
    titleKey: "dashboard.activity.reward",
    descriptionKey: "dashboard.activity.rewardDesc",
    timeKey: "dashboard.activity.time.threeDaysAgo",
    colorScheme: { bg: "bg-purple-100", border: "border-purple-500" },
  },
];

export const departmentChanges: DepartmentChangeData[] = [
  {
    authorKey: "dashboard.department.author.anna",
    descriptionKey: "dashboard.department.ergonomicStations",
    timeKey: "dashboard.activity.time.twoHoursAgo",
    departmentKey: "dashboard.department.name.assembly",
    colorScheme: { bg: "bg-teal-100", border: "border-teal-500" },
  },
  {
    authorKey: "dashboard.department.author.marek",
    descriptionKey: "dashboard.department.safetyProtocol",
    timeKey: "dashboard.activity.time.yesterday",
    departmentKey: "dashboard.department.name.warehouse",
    colorScheme: { bg: "bg-indigo-100", border: "border-indigo-500" },
  },
  {
    authorKey: "dashboard.department.author.katarzyna",
    descriptionKey: "dashboard.department.qualityChecklist",
    timeKey: "dashboard.activity.time.twoDaysAgo",
    departmentKey: "dashboard.department.name.quality",
    colorScheme: { bg: "bg-rose-100", border: "border-rose-500" },
  },
  {
    authorKey: "dashboard.department.author.tomek",
    descriptionKey: "dashboard.department.toolOrganization",
    timeKey: "dashboard.activity.time.threeDaysAgo",
    departmentKey: "dashboard.department.name.maintenance",
    colorScheme: { bg: "bg-cyan-100", border: "border-cyan-500" },
  },
];
