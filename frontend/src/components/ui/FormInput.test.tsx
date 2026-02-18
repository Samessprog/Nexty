import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import FormInput from "@/components/ui/FormInput";

describe("FormInput", () => {
  it("associates label with input via htmlFor/id", () => {
    render(<FormInput label="Email" id="email" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  it('sets placeholder=" " for the floating label mechanism', () => {
    render(<FormInput label="Email" id="email" />);
    expect(screen.getByLabelText("Email")).toHaveAttribute("placeholder", " ");
  });

  it('renders an error with role="alert" and sets aria-invalid', () => {
    render(<FormInput label="Email" id="email" error="Required" />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Required");
  });

  it("renders an icon when provided", () => {
    render(
      <FormInput
        label="Email"
        id="email"
        icon={<span data-testid="icon">@</span>}
      />,
    );
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("accepts typed input", async () => {
    const user = userEvent.setup();
    render(<FormInput label="Email" id="email" />);

    const input = screen.getByLabelText("Email");
    await user.type(input, "test@example.com");
    expect(input).toHaveValue("test@example.com");
  });
});
