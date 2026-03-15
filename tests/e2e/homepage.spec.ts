import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads and displays module cards", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/ClaudeTuts/);
    await expect(page.getByText("Learn AI with")).toBeVisible();
    await expect(page.getByText("Claude Fundamentals")).toBeVisible();
    await expect(page.getByText("Prompt Engineering")).toBeVisible();
    await expect(page.getByText("AI Agents")).toBeVisible();
  });

  test("navigation links are present", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Learn" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Playground" })).toBeVisible();
  });

  test("module card navigates to module page", async ({ page }) => {
    await page.goto("/");

    await page.getByText("Claude Fundamentals").click();
    await expect(page).toHaveURL(/claude-fundamentals/);
  });
});
