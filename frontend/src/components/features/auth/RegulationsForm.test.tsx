import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegulationsForm from "@/components/features/auth/RegulationsForm";
import TestWrapper from "@/test/TestI18nProvider";

const defaultProps = {
  onSubmit: vi.fn().mockResolvedValue(undefined),
  onBack: vi.fn(),
  isSubmitting: false,
  authError: null as string | null,
  clearAuthError: vi.fn(),
};

function renderForm(overrides: Partial<typeof defaultProps> = {}) {
  const props = { ...defaultProps, ...overrides };
  return render(
    <TestWrapper>
      <RegulationsForm {...props} />
    </TestWrapper>,
  );
}

describe("RegulationsForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both checkboxes and submit button", () => {
    renderForm();
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: /accept & continue/i }),
    ).toBeInTheDocument();
  });

  it("renders terms and privacy links", () => {
    renderForm();
    const termsLink = screen.getByRole("link", { name: "Terms of Service" });
    expect(termsLink).toHaveAttribute("href", "/terms");
    expect(termsLink).toHaveAttribute("target", "_blank");

    const privacyLink = screen.getByRole("link", { name: "Privacy Policy" });
    expect(privacyLink).toHaveAttribute("href", "/privacy");
    expect(privacyLink).toHaveAttribute("target", "_blank");
  });

  it("shows validation errors when submitting without checking boxes", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(
      screen.getByRole("button", { name: /accept & continue/i }),
    );

    await waitFor(() => {
      expect(
        screen.getByText("You must accept the Terms of Service"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You must accept the Privacy Policy"),
      ).toBeInTheDocument();
    });

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  it("submits successfully when both checkboxes are checked", async () => {
    const user = userEvent.setup();
    renderForm();

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    await user.click(
      screen.getByRole("button", { name: /accept & continue/i }),
    );

    await waitFor(() => {
      expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onBack when back button is clicked", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: /back to login/i }));

    expect(defaultProps.onBack).toHaveBeenCalledTimes(1);
  });

  it("displays auth error alert", () => {
    renderForm({ authError: "auth.errors.unknown" });
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred. Please try again."),
    ).toBeInTheDocument();
  });

  it("disables buttons when isSubmitting is true", () => {
    renderForm({ isSubmitting: true });
    expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /back to login/i }),
    ).toBeDisabled();
  });

  it("shows submitting text when isSubmitting is true", () => {
    renderForm({ isSubmitting: true });
    expect(screen.getByText("Submitting...")).toBeInTheDocument();
  });
});
