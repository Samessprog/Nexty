import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "@/components/ui/ThemeToggle";
import TestWrapper from "@/test/TestI18nProvider";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  it("renders the toggle button", () => {
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>,
    );
    expect(
      screen.getByRole("button", { name: /switch to dark mode/i }),
    ).toBeInTheDocument();
  });

  it("toggles theme on click", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <ThemeToggle />
      </TestWrapper>,
    );

    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    await user.click(button);

    expect(
      screen.getByRole("button", { name: /switch to light mode/i }),
    ).toBeInTheDocument();
  });
});
