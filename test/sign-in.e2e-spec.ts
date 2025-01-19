import { test, expect } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite seu email").fill("johndoe@example.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação para seu email!"
  );
  expect(toast).toBeVisible();
});

test("sign in with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite seu email").fill("wrong@example.com");

  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText("Ocorreu um erro ao tentar acessar sua conta!");
  expect(toast).toBeVisible();
});

test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await Promise.all([
    page.getByRole("link", { name: "Crie uma conta" }).click(),
    page.waitForURL("/sign-up", { waitUntil: "networkidle" }),
  ]);

  expect(page.url()).toContain("/sign-up");
});
