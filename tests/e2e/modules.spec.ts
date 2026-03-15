import { test, expect } from "@playwright/test";

test.describe("Module Pages", () => {
  const modules = [
    "claude-fundamentals",
    "prompt-engineering",
    "ai-agents",
    "mcp",
    "rag-systems",
  ];

  for (const slug of modules) {
    test(`${slug} module page loads`, async ({ page }) => {
      await page.goto(`/learn/${slug}`);
      await expect(page).not.toHaveURL(/404/);
      // Breadcrumb should show "Learn"
      await expect(page.getByRole("link", { name: "Learn" })).toBeVisible();
    });
  }

  test("unknown module shows graceful fallback", async ({ page }) => {
    await page.goto("/learn/nonexistent-module");
    await expect(page.getByText("Module not found")).toBeVisible();
  });
});
