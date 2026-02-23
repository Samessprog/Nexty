import { expect, test } from "@playwright/test";
import { loginAndNavigateToDashboard } from "./helpers/login";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await loginAndNavigateToDashboard(page);
  });

  test("navigates to dashboard after login", async ({ page }) => {
    await expect(page).toHaveURL("/dashboard");
  });

  // test("displays sidebar nav items", async ({ page }) => {
  //   const sidebar = page.getByTestId("sidebar");
  //   await expect(sidebar.getByText("Dashboard")).toBeVisible();
  //   await expect(sidebar.getByText("My Submissions")).toBeVisible();
  //   await expect(sidebar.getByText("Rankings")).toBeVisible();
  //   await expect(sidebar.getByText("Rewards")).toBeVisible();
  // });

  // test("displays stat cards with correct values", async ({ page }) => {
  //   await expect(page.getByText("1,250")).toBeVisible();
  //   await expect(page.getByText("#14")).toBeVisible();
  //   await expect(page.getByText("24")).toBeVisible();
  //   // The value 12 appears in both stat cards and status cards
  //   await expect(page.getByText("12").first()).toBeVisible();
  // });

  // test("displays submission status section", async ({ page }) => {
  //   await expect(page.getByText("Submission Status")).toBeVisible();
  //   await expect(page.getByText("New")).toBeVisible();
  //   await expect(page.getByText("In Verification")).toBeVisible();
  // });

  // test("displays efficiency chart", async ({ page }) => {
  //   await expect(page.getByText("Submission Efficiency")).toBeVisible();
  // });

  // test("displays activity feed", async ({ page }) => {
  //   await expect(page.getByText("Recent Activity")).toBeVisible();
  //   await expect(page.getByText("Idea accepted")).toBeVisible();
  // });

  // test("logout redirects to login", async ({ page }) => {
  //   const sidebar = page.getByTestId("sidebar");
  //   await sidebar.getByText("Logout").click();
  //   await page.waitForURL("/login");
  //   await expect(page).toHaveURL("/login");
  // });
});
