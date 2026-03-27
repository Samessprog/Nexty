import type { Page } from "@playwright/test";

export async function loginAndNavigateToDashboard(page: Page) {
  await page.goto("/login");
  await page.locator("#email").fill("test@kznnexus.io");
  await page.locator("#password").fill("Test1234!");
  await page.getByRole("button", { name: "Login" }).click();

  // Race: either we reach /dashboard or an error alert appears
  const result = await Promise.race([
    page.waitForURL("/dashboard").then(() => "navigated" as const),
    page
      .locator('[role="alert"]')
      .waitFor({ state: "visible", timeout: 15_000 })
      .then(async () => {
        const text = await page.locator('[role="alert"]').textContent();
        return `error:${text}` as const;
      }),
  ]);

  if (result.startsWith("error:")) {
    throw new Error(`Login failed — UI showed: ${result.slice(6)}`);
  }
}
