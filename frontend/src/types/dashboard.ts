import type { Icon } from "@phosphor-icons/react";

export interface StatCardData {
  icon: Icon;
  iconBg: string;
  iconColor: string;
  labelKey: string;
  value: string;
  badge?: {
    text: string;
    variant: "success" | "neutral";
    icon?: Icon;
  };
  trend?: { direction: "up" | "down" | "flat"; valueKey: string };
}

export interface SubmissionStatusData {
  icon: Icon;
  labelKey: string;
  count: number;
  colorScheme: {
    bg: string;
    text: string;
    hoverBorder: string;
    hoverBg: string;
    hoverText: string;
  };
  dimmed?: boolean;
}

export interface ChartDataPoint {
  monthKey: string;
  total: number;
  implemented: number;
  avgDays: number;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
}

export interface ActivityItemData {
  titleKey: string;
  descriptionKey: string;
  timeKey: string;
  colorScheme: {
    bg: string;
    border: string;
  };
}

export interface DepartmentChangeData {
  authorKey: string;
  descriptionKey: string;
  timeKey: string;
  departmentKey: string;
  colorScheme: {
    bg: string;
    border: string;
  };
}
