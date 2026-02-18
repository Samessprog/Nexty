import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Sidebar from "@/components/layout/Sidebar";
import TestWrapper from "@/test/TestI18nProvider";

const mockLogout = vi.fn();

vi.mock("@/context/AuthContext", () => ({
  useAuth: () => ({
    user: { userId: "dev-user-001", username: "test@kznnexus.io" },
    isAuthenticated: true,
    isLoading: false,
    error: null,
    setError: vi.fn(),
    logout: mockLogout,
    refreshUser: vi.fn(),
  }),
}));

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  collapsed: false,
  onToggleCollapse: vi.fn(),
};

describe("Sidebar", () => {
  it("renders the logo", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );
    expect(screen.getByText("KZN Nexus")).toBeInTheDocument();
  });

  it("renders nav items", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getAllByText("My Submissions").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Rankings").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("Rewards")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders user profile", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );
    expect(screen.getByText("Jan Kowalski")).toBeInTheDocument();
    expect(screen.getByText("Line Operator")).toBeInTheDocument();
  });

  it("calls logout when logout is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );

    const logoutButton = screen.getByText("Logout");
    await user.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  it("renders collapse toggle button", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} />
      </TestWrapper>,
    );
    expect(screen.getByTestId("sidebar-collapse-toggle")).toBeInTheDocument();
  });

  it("hides nav labels and brand name when collapsed", () => {
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} collapsed={true} />
      </TestWrapper>,
    );
    // Brand name should be hidden
    expect(screen.queryByText("KZN Nexus")).not.toBeInTheDocument();
    // User name and role should be hidden
    expect(screen.queryByText("Jan Kowalski")).not.toBeInTheDocument();
    expect(screen.queryByText("Line Operator")).not.toBeInTheDocument();
    // System section label should be hidden
    expect(screen.queryByText("System")).not.toBeInTheDocument();
    // Version should be hidden
    expect(screen.queryByText("v2.5.1 Nexus Pro")).not.toBeInTheDocument();
    // Nav labels exist only as tooltips (opacity-0), but are still in the DOM
    // Verify the sidebar has the collapsed width class
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar.className).toContain("w-16");
  });

  it("calls onToggleCollapse when toggle button is clicked", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <Sidebar {...defaultProps} onToggleCollapse={onToggle} />
      </TestWrapper>,
    );

    await user.click(screen.getByTestId("sidebar-collapse-toggle"));
    expect(onToggle).toHaveBeenCalledOnce();
  });
});
