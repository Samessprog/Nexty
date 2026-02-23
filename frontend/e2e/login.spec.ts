import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  // test("all key elements are visible", async ({ page }) => {
  //   await expect(
  //     page.getByRole("heading", { name: "KZN Nexus" }).first(),
  //   ).toBeVisible();
  //   await expect(
  //     page.getByText(/initialize your continuous improvement/i),
  //   ).toBeVisible();
  //   await expect(page.getByLabel("Email Address")).toBeVisible();
  //   await expect(page.locator("#password")).toBeVisible();
  //   await expect(
  //     page.getByRole("button", { name: /authenticate/i }),
  //   ).toBeVisible();
  //   await expect(page.getByText("Google Workspace")).toBeVisible();
  //   await expect(page.getByText("LinkedIn OIDC")).toBeVisible();
  //   await expect(page.getByText("Request Access")).toBeVisible();
  // });

  test("password toggle works", async ({ page }) => {
    const passwordInput = page.locator("#password");
    await expect(passwordInput).toHaveAttribute("type", "password");

    await page.getByRole("button", { name: "Show password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "text");

    await page.getByRole("button", { name: "Hide password" }).click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  // test("form input works", async ({ page }) => {
  //   await page.getByLabel("Email Address").fill("test@example.com");
  //   await expect(page.getByLabel("Email Address")).toHaveValue(
  //     "test@example.com",
  //   );
  //
  //   await page.locator("#password").fill("secret123");
  //   await expect(page.locator("#password")).toHaveValue("secret123");
  // });

  // test("language switch to Polish works", async ({ page }) => {
  //   await expect(
  //     page.getByText(/initialize your continuous improvement/i),
  //   ).toBeVisible();
  //
  //   await page.getByRole("button", { name: "Switch language" }).click();
  //
  //   await expect(page.getByText(/zainicjuj swoją przestrzeń/i)).toBeVisible();
  // });
});
