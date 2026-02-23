import { expect, test } from "@playwright/test";

test.describe("Dashboard responsive", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.locator("#email").fill("test@kznnexus.io");
    await page.locator("#password").fill("Test1234!");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL("/dashboard");
  });

  test("mobile: sidebar is hidden by default, hamburger visible", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Mobile test only runs on Chromium");
    // Pixel 5 viewport is 393x851 — sidebar should be off-screen
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toHaveClass(/-translate-x-full/);
    const hamburger = page.getByTestId("hamburger-toggle");
    await expect(hamburger).toBeVisible();
  });

  test("mobile: sidebar opens on hamburger click", async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== "chromium", "Mobile test only runs on Chromium");
    const hamburger = page.getByTestId("hamburger-toggle");
    await hamburger.click();
    const sidebar = page.getByTestId("sidebar");
    await expect(sidebar).toBeVisible();
    await expect(sidebar.getByText("Dashboard")).toBeVisible();
  });

  test("desktop: sidebar is always visible", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "Desktop test");
    const viewport = page.viewportSize();
    if (viewport && viewport.width >= 1024) {
      const sidebar = page.getByTestId("sidebar");
      await expect(sidebar).toBeVisible();
    }
  });
});
