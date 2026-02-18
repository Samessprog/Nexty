import { render, screen } from "@testing-library/react";

import ActivityItem from "@/components/features/dashboard/ActivityItem";
import TestWrapper from "@/test/TestI18nProvider";
import type { ActivityItemData } from "@/types/dashboard";

const mockData: ActivityItemData = {
  titleKey: "dashboard.activity.ideaAccepted",
  descriptionKey: "dashboard.activity.ideaAcceptedDesc",
  timeKey: "dashboard.activity.time.twoHoursAgo",
  colorScheme: { bg: "bg-emerald-100", border: "border-emerald-500" },
};

describe("ActivityItem", () => {
  it("renders title and time", () => {
    render(
      <TestWrapper>
        <ActivityItem data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByText("Idea accepted")).toBeInTheDocument();
    expect(screen.getByText("2 hours ago")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(
      <TestWrapper>
        <ActivityItem data={mockData} />
      </TestWrapper>,
    );
    expect(screen.getByText("#2941")).toBeInTheDocument();
  });

  it("renders the colored dot", () => {
    render(
      <TestWrapper>
        <ActivityItem data={mockData} />
      </TestWrapper>,
    );
    const dot = screen.getByTestId("activity-dot");
    expect(dot.className).toContain("bg-emerald-100");
    expect(dot.className).toContain("border-emerald-500");
  });
});
