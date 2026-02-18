import { render, screen } from "@testing-library/react";

import KaizenStreakBanner from "@/components/features/dashboard/KaizenStreakBanner";
import TestWrapper from "@/test/TestI18nProvider";
import type { StreakData } from "@/types/dashboard";

const mockStreak: StreakData = {
  currentStreak: 7,
  bestStreak: 14,
};

describe("KaizenStreakBanner", () => {
  it("renders the streak count", () => {
    render(
      <TestWrapper>
        <KaizenStreakBanner data={mockStreak} />
      </TestWrapper>,
    );
    expect(screen.getByTestId("streak-count")).toHaveTextContent(
      "7 day streak",
    );
  });

  it("renders best streak", () => {
    render(
      <TestWrapper>
        <KaizenStreakBanner data={mockStreak} />
      </TestWrapper>,
    );
    expect(screen.getByText("Best: 14 days")).toBeInTheDocument();
  });
});
