import { render, screen } from "@testing-library/react";

import LoginPage from "@/pages/LoginPage";
import TestWrapper from "@/test/TestI18nProvider";

const mockUseLogin = {
  login: vi.fn(),
  submitNewPassword: vi.fn(),
  submitRegulationsAcceptance: vi.fn(),
  isSubmitting: false,
  authError: null,
  clearAuthError: vi.fn(),
  challengeStep: null as string | null,
  resetChallenge: vi.fn(),
};

vi.mock("@/hooks/useLogin", () => ({
  useLogin: () => mockUseLogin,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    mockUseLogin.challengeStep = null;
    mockUseLogin.authError = null;
  });

  it("renders the full login page", () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(screen.getAllByText("KZN Nexus").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/initialize your continuous improvement/i),
    ).toBeInTheDocument();
  });

  it("renders the design panel with hidden class for mobile", () => {
    const { container } = render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    const designPanel = container.querySelector(".abstract-bg");
    expect(designPanel).toBeInTheDocument();
    expect(designPanel?.className).toContain("hidden");
    expect(designPanel?.className).toContain("lg:flex");
  });

  it("renders footer with register link", () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(screen.getByText("New to KZN Nexus?")).toBeInTheDocument();
    expect(screen.getByText("Request Access")).toBeInTheDocument();
  });

  it("renders the language switcher", () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(
      screen.getByRole("button", { name: "Switch language" }),
    ).toBeInTheDocument();
  });

  it("renders NewPasswordForm when challengeStep is CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED", () => {
    mockUseLogin.challengeStep = "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED";
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(screen.getByText("Set New Password")).toBeInTheDocument();
    expect(
      screen.getByText(/temporary password has expired/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("New Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("renders RegulationsForm when challengeStep is REGULATIONS_ACCEPTANCE", () => {
    mockUseLogin.challengeStep = "REGULATIONS_ACCEPTANCE";
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );
    expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
    expect(
      screen.getByText(/review and accept the regulations/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /accept & continue/i }),
    ).toBeInTheDocument();
  });
});
