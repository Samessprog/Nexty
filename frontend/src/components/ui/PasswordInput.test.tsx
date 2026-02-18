import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PasswordInput from "@/components/ui/PasswordInput";
import TestWrapper from "@/test/TestI18nProvider";

describe("PasswordInput", () => {
  it('renders as type="password" by default', () => {
    render(
      <TestWrapper>
        <PasswordInput label="Password" id="pw" />
      </TestWrapper>,
    );
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
  });

  it("toggles visibility on button click", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PasswordInput label="Password" id="pw" />
      </TestWrapper>,
    );
    const input = screen.getByLabelText("Password");
    const toggle = screen.getByRole("button", { name: "Show password" });

    expect(input).toHaveAttribute("type", "password");

    await user.click(toggle);
    expect(input).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(input).toHaveAttribute("type", "password");
  });

  it("calls onChange when typing", async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <PasswordInput label="Password" id="pw" onChange={handleChange} />
      </TestWrapper>,
    );
    await user.type(screen.getByLabelText("Password"), "abc");
    expect(handleChange).toHaveBeenCalledTimes(3);
  });
});
