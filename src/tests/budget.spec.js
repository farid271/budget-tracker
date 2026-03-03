import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173");
});

// ─── Balance Tests ───────────────────────────────────────────────

test("shows $0.00 balance on load", async ({ page }) => {
  const balance = page.locator(".balance-amount");
  await expect(balance).toContainText("$0.00");
});

// ─── Adding Transactions ─────────────────────────────────────────

test("can add an income transaction", async ({ page }) => {
  await page.getByTestId("description-input").fill("Salary");
  await page.getByTestId("amount-input").fill("2000");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("transaction-item").first()).toContainText("Salary");
  await expect(page.locator(".balance-amount")).toContainText("$2,000.00");
  await expect(page.locator(".stat-amount.income")).toContainText("$2,000.00");
});

test("can add an expense transaction", async ({ page }) => {
  await page.getByTestId("description-input").fill("Groceries");
  await page.getByTestId("amount-input").fill("-50");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("transaction-item").first()).toContainText("Groceries");
  await expect(page.locator(".balance-amount")).toContainText("-$50.00");
  await expect(page.locator(".stat-amount.expense")).toContainText("-$50.00");
});

test("balance updates correctly with multiple transactions", async ({ page }) => {
  await page.getByTestId("description-input").fill("Salary");
  await page.getByTestId("amount-input").fill("3000");
  await page.getByTestId("add-btn").click();

  await page.getByTestId("description-input").fill("Rent");
  await page.getByTestId("amount-input").fill("-1200");
  await page.getByTestId("add-btn").click();

  await expect(page.locator(".balance-amount")).toContainText("$1,800.00");
});

// ─── Deleting Transactions ───────────────────────────────────────

test("can delete a transaction", async ({ page }) => {
  await page.getByTestId("description-input").fill("Netflix");
  await page.getByTestId("amount-input").fill("-15");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("transaction-item")).toHaveCount(1);

  await page.getByTestId("delete-btn").first().click();

  await expect(page.getByTestId("transaction-item")).toHaveCount(0);
  await expect(page.locator(".balance-amount")).toContainText("$0.00");
});

// ─── Validation / Edge Cases ─────────────────────────────────────

test("shows error when description is empty", async ({ page }) => {
  await page.getByTestId("amount-input").fill("100");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("error-msg")).toContainText(
    "Please enter a description."
  );
});

test("shows error when amount is empty", async ({ page }) => {
  await page.getByTestId("description-input").fill("Coffee");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("error-msg")).toContainText(
    "Please enter a valid non-zero amount."
  );
});

test("shows error when amount is zero", async ({ page }) => {
  await page.getByTestId("description-input").fill("Nothing");
  await page.getByTestId("amount-input").fill("0");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("error-msg")).toContainText(
    "Please enter a valid non-zero amount."
  );
});

test("clears inputs after adding a transaction", async ({ page }) => {
  await page.getByTestId("description-input").fill("Bonus");
  await page.getByTestId("amount-input").fill("500");
  await page.getByTestId("add-btn").click();

  await expect(page.getByTestId("description-input")).toHaveValue("");
  await expect(page.getByTestId("amount-input")).toHaveValue("");
});

test("shows empty state when no transactions exist", async ({ page }) => {
  await expect(page.locator(".empty-state")).toBeVisible();
});