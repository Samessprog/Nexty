import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ActivityFeed from "@/components/features/dashboard/ActivityFeed";
import TestWrapper from "@/test/TestI18nProvider";
import type { ActivityItemData, DepartmentChangeData } from "@/types/dashboard";

const mockItems: ActivityItemData[] = [
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
];

const mockDepartmentChanges: DepartmentChangeData[] = [
  {
    authorKey: "dashboard.department.author.anna",
    descriptionKey: "dashboard.department.ergonomicStations",
    timeKey: "dashboard.activity.time.twoHoursAgo",
    departmentKey: "dashboard.department.name.assembly",
    colorScheme: { bg: "bg-teal-100", border: "border-teal-500" },
  },
];

describe("ActivityFeed", () => {
  it("renders tab buttons", () => {
    render(
      <TestWrapper>
        <ActivityFeed
          items={mockItems}
          departmentChanges={mockDepartmentChanges}
        />
      </TestWrapper>,
    );
    expect(screen.getByText("My Activity")).toBeInTheDocument();
    expect(screen.getByText("Department Changes")).toBeInTheDocument();
  });

  it("renders all activity items in My Activity tab by default", () => {
    render(
      <TestWrapper>
        <ActivityFeed
          items={mockItems}
          departmentChanges={mockDepartmentChanges}
        />
      </TestWrapper>,
    );
    expect(screen.getByText("Idea accepted")).toBeInTheDocument();
    expect(screen.getByText("New comment")).toBeInTheDocument();
  });

  it("switches to department changes tab", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ActivityFeed
          items={mockItems}
          departmentChanges={mockDepartmentChanges}
        />
      </TestWrapper>,
    );
    await user.click(screen.getByText("Department Changes"));
    expect(screen.getByText("Anna Nowak")).toBeInTheDocument();
    expect(screen.getByText("Assembly")).toBeInTheDocument();
  });

  it("renders the more button", () => {
    render(
      <TestWrapper>
        <ActivityFeed
          items={mockItems}
          departmentChanges={mockDepartmentChanges}
        />
      </TestWrapper>,
    );
    expect(screen.getByTestId("activity-more")).toBeInTheDocument();
  });
});
