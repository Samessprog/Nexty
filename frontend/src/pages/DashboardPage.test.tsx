import { render, screen } from "@testing-library/react";

import DashboardPage from "@/pages/DashboardPage";
import TestWrapper from "@/test/TestI18nProvider";

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: { userId: "dev-user-001", username: "test@kznnexus.io" },
    isAuthenticated: true,
    isLoading: false,
    error: null,
    setError: vi.fn(),
    logout: vi.fn(),
    refreshUser: vi.fn(),
  }),
}));

describe("DashboardPage", () => {
  it("renders stat cards", () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>,
    );
    expect(screen.getByText("1,250")).toBeInTheDocument();
    expect(screen.getByText("#14")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getAllByText("12").length).toBeGreaterThanOrEqual(1);
  });

  it("renders submission status section", () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>,
    );
    expect(screen.getByText("Submission Status")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
    expect(screen.getByText("In Verification")).toBeInTheDocument();
  });

  it("renders the efficiency chart", () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>,
    );
    expect(screen.getByText("Submission Efficiency")).toBeInTheDocument();
  });

  it("renders the activity feed", () => {
    render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>,
    );
    expect(screen.getByText("My Activity")).toBeInTheDocument();
    expect(screen.getByText("Idea accepted")).toBeInTheDocument();
  });
});
