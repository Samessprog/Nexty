import { Star } from "@phosphor-icons/react";
import { render, screen } from "@testing-library/react";

import StatCard from "@/components/features/dashboard/StatCard";
import TestWrapper from "@/test/TestI18nProvider";
import type { StatCardData } from "@/types/dashboard";

const baseData: StatCardData = {
  icon: Star,
  iconBg: "bg-blue-50",
  iconColor: "text-blue-600",
  labelKey: "dashboard.stats.points",
  value: "1,250",
};

describe("StatCard", () => {
  it("renders the value and label", () => {
    render(
      <TestWrapper>
        <StatCard data={baseData} />
      </TestWrapper>,
    );
    expect(screen.getByText("1,250")).toBeInTheDocument();
    expect(screen.getByText("Points")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    const { container } = render(
      <TestWrapper>
        <StatCard data={baseData} />
      </TestWrapper>,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders badge when present", () => {
    const dataWithBadge: StatCardData = {
      ...baseData,
      badge: { text: "dashboard.stats.thisMonth", variant: "success" },
    };
    render(
      <TestWrapper>
        <StatCard data={dataWithBadge} />
      </TestWrapper>,
    );
    expect(screen.getByTestId("stat-badge")).toBeInTheDocument();
    expect(screen.getByText("+50 this month")).toBeInTheDocument();
  });

  it("does not render badge when absent", () => {
    render(
      <TestWrapper>
        <StatCard data={baseData} />
      </TestWrapper>,
    );
    expect(screen.queryByTestId("stat-badge")).not.toBeInTheDocument();
  });

  it("renders trend indicator when present", () => {
    const dataWithTrend: StatCardData = {
      ...baseData,
      trend: { direction: "up", valueKey: "dashboard.stats.trend.pointsUp" },
    };
    render(
      <TestWrapper>
        <StatCard data={dataWithTrend} />
      </TestWrapper>,
    );
    expect(screen.getByTestId("stat-trend")).toBeInTheDocument();
    expect(screen.getByText("+12% vs last month")).toBeInTheDocument();
  });

  it("does not render trend indicator when absent", () => {
    render(
      <TestWrapper>
        <StatCard data={baseData} />
      </TestWrapper>,
    );
    expect(screen.queryByTestId("stat-trend")).not.toBeInTheDocument();
  });

  it("renders flat trend with correct styling", () => {
    const dataWithFlatTrend: StatCardData = {
      ...baseData,
      trend: {
        direction: "flat",
        valueKey: "dashboard.stats.trend.implementedFlat",
      },
    };
    render(
      <TestWrapper>
        <StatCard data={dataWithFlatTrend} />
      </TestWrapper>,
    );
    expect(screen.getByText("Same as last month")).toBeInTheDocument();
  });
});
