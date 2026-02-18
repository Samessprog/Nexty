import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import TestWrapper, { testI18n } from "@/test/TestI18nProvider";

describe("LanguageSwitcher", () => {
  beforeEach(async () => {
    await testI18n.changeLanguage("en");
  });

  it("renders trigger with current language code", () => {
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    const trigger = screen.getByRole("button", { name: "Switch language" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("EN")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));

    expect(
      screen.getByRole("button", { name: "Switch language" }),
    ).toHaveAttribute("aria-expanded", "true");
    const listbox = screen.getByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(screen.getByText("English")).toBeInTheDocument();
    expect(screen.getByText("Polski")).toBeInTheDocument();
    expect(screen.getByText("Deutsch")).toBeInTheDocument();
  });

  it("selects language and closes dropdown", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    await user.click(screen.getByText("Polski"));

    expect(testI18n.language).toBe("pl");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    expect(screen.getByText("PL")).toBeInTheDocument();
  });

  it("selects German language", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    await user.click(screen.getByText("Deutsch"));

    expect(testI18n.language).toBe("de");
    expect(screen.getByText("DE")).toBeInTheDocument();
  });

  it("shows check mark on selected language", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));

    const options = screen.getAllByRole("option");
    const enOption = options.find((opt) =>
      opt.textContent?.includes("English"),
    );
    const plOption = options.find((opt) => opt.textContent?.includes("Polski"));

    expect(enOption).toHaveAttribute("aria-selected", "true");
    expect(plOption).toHaveAttribute("aria-selected", "false");
  });

  it("closes dropdown on Escape", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown on click outside", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <div data-testid="outside">
          <LanguageSwitcher />
        </div>
      </TestWrapper>,
    );

    await user.click(screen.getByRole("button", { name: "Switch language" }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("toggles dropdown open and close on trigger click", async () => {
    const user = userEvent.setup();
    render(
      <TestWrapper>
        <LanguageSwitcher />
      </TestWrapper>,
    );

    const trigger = screen.getByRole("button", { name: "Switch language" });

    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
