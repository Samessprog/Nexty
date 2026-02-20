import { test, expect } from "@playwright/test";

test.describe("Login Page - Responsive", () => {
  test("mobile: design panel hidden, mobile logo visible", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/login");

    const designPanel = page.locator(".abstract-bg");
    await expect(designPanel).toBeHidden();

    await expect(page.getByTestId("mobile-logo")).toBeVisible();
  });

  test("desktop: design panel visible", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/login");

    const designPanel = page.locator(".abstract-bg");
    await expect(designPanel).toBeVisible();
  });
});
