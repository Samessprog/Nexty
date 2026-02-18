import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DashboardHeader from "@/components/features/dashboard/DashboardHeader";
import TestWrapper from "@/test/TestI18nProvider";

describe("DashboardHeader", () => {
  it("renders the greeting", () => {
    render(
      <TestWrapper>
        <DashboardHeader onMenuToggle={vi.fn()} />
      </TestWrapper>,
    );
    expect(screen.getByText("Good morning, Jan")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(
      <TestWrapper>
        <DashboardHeader onMenuToggle={vi.fn()} />
      </TestWrapper>,
    );
    expect(
      screen.getByText("Submissions and statistics panel"),
    ).toBeInTheDocument();
  });

  it("renders the action button", () => {
    render(
      <TestWrapper>
        <DashboardHeader onMenuToggle={vi.fn()} />
      </TestWrapper>,
    );
    expect(screen.getByText("Submit new idea")).toBeInTheDocument();
  });

  it("calls onMenuToggle when hamburger is clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    render(
      <TestWrapper>
        <DashboardHeader onMenuToggle={onToggle} />
      </TestWrapper>,
    );
    const hamburger = screen.getByTestId("hamburger-toggle");
    await user.click(hamburger);
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
