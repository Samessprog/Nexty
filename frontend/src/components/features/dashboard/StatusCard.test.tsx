import { Prohibit, Sparkle } from "@phosphor-icons/react";
import { render, screen } from "@testing-library/react";

import StatusCard from "@/components/features/dashboard/StatusCard";
import TestWrapper from "@/test/TestI18nProvider";
import type { SubmissionStatusData } from "@/types/dashboard";

const baseData: SubmissionStatusData = {
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
};

describe("StatusCard", () => {
  it("renders count and label", () => {
    render(
      <TestWrapper>
        <StatusCard data={baseData} />
      </TestWrapper>,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a button", () => {
    render(
      <TestWrapper>
        <StatusCard data={baseData} />
      </TestWrapper>,
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies dimmed variant when set", () => {
    const dimmedData: SubmissionStatusData = {
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
    };
    render(
      <TestWrapper>
        <StatusCard data={dimmedData} />
      </TestWrapper>,
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("opacity-75");
  });
});
