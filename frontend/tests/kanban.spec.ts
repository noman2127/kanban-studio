import { expect, test, type Locator, type Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL("/");
}

function getColumns(page: Page): Locator {
  return page.locator('[data-testid^="column-"]');
}

test.beforeEach(async ({ page }) => {
  await page.goto("/login");
  await page.evaluate(() => {
    localStorage.clear();
  });
});

test("redirects to login when not authenticated", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
});

test("logs in with valid credentials and shows backend board", async ({ page }) => {
  await login(page);
  await expect(page.getByText("Welcome, user")).toBeVisible();
  await expect(getColumns(page)).toHaveCount(5);
});

test("adds a card and persists after refresh", async ({ page }) => {
  await login(page);

  const firstColumn = getColumns(page).first();
  const uniqueTitle = `E2E Persist ${Date.now()}`;
  const uniqueDetails = "Created by backend integration test";

  await firstColumn.getByRole("button", { name: /Add a card/i }).click();
  await firstColumn.getByPlaceholder("Card title").fill(uniqueTitle);
  await firstColumn.getByPlaceholder("Details").fill(uniqueDetails);
  await firstColumn.getByRole("button", { name: /Add card/i }).click();

  await expect(page.getByText(uniqueTitle)).toBeVisible();

  await page.reload();
  await expect(page.getByText(uniqueTitle)).toBeVisible();

  const card = page
    .locator('[data-testid^="card-"]')
    .filter({ hasText: uniqueTitle })
    .first();
  await card.getByRole("button", { name: new RegExp(`Delete ${uniqueTitle}`) }).click();
  await expect(page.getByText(uniqueTitle)).toHaveCount(0);
});

test("renames a column and persists after refresh", async ({ page }) => {
  await login(page);

  const firstColumn = getColumns(page).first();
  const titleInput = firstColumn.getByLabel("Column title");
  const originalTitle = (await titleInput.inputValue()).trim();
  const updatedTitle = `Backlog ${Date.now()}`;

  await titleInput.fill(updatedTitle);
  await expect(titleInput).toHaveValue(updatedTitle);

  await page.reload();
  const refreshedInput = getColumns(page).first().getByLabel("Column title");
  await expect(refreshedInput).toHaveValue(updatedTitle);

  await refreshedInput.fill(originalTitle);
  await expect(refreshedInput).toHaveValue(originalTitle);
});

test("moves a card between columns and persists after refresh", async ({ page }) => {
  await login(page);

  const sourceCard = page.getByTestId("card-1");
  const targetColumn = page.getByTestId("column-2");
  const sourceBox = await sourceCard.boundingBox();
  const targetBox = await targetColumn.boundingBox();
  if (!sourceBox || !targetBox) {
    throw new Error("Could not resolve drag source/target coordinates.");
  }

  await page.mouse.move(
    sourceBox.x + sourceBox.width / 2,
    sourceBox.y + sourceBox.height / 2
  );
  await page.mouse.down();
  await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + 120, {
    steps: 12,
  });
  await page.mouse.up();

  await expect(targetColumn.getByTestId("card-1")).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("column-2").getByTestId("card-1")).toBeVisible();
});
