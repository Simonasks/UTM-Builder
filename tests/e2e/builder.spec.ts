import { test, expect } from "@playwright/test";

test("builder preview renders", async ({ page }) => {
  await page.goto("http://localhost:3000/builder");
  await expect(page.getByRole("heading", { name: "Link builder" })).toBeVisible();
  await page.getByLabel("Base URL").fill("https://example.com");
  await page.getByRole("button", { name: "Build & copy" }).click();
});
