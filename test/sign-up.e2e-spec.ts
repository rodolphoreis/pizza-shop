import { test, expect } from "@playwright/test";

test("navigate to new restaurant page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await Promise.all([
    page.getByRole("link", { name: "Crie uma conta" }).click(),
    page.waitForURL("/sign-up", { waitUntil: "networkidle" }),
  ]);

  expect(page.url()).toContain("/sign-up");
});

test("enter data to create new restaurant", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite o nome do seu").fill("Pizza Shop");
  await page.getByPlaceholder("Digite o seu nome").fill("John Doe");
  await page.getByPlaceholder("Digite seu número de telefone").fill("1234");
  await page.getByPlaceholder("Digite seu email").fill("johndoe@test.com");

  page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Restaurante cadastrado com sucesso!");
  expect(toast).toBeVisible();
});

test("sign up with error", async ({ page }) => {
  await page.goto("/sign-up", { waitUntil: "networkidle" });

  await page.getByPlaceholder("Digite o nome do seu").fill("Invalid Name");
  await page.getByPlaceholder("Digite o seu nome").fill("John Doe");
  await page.getByPlaceholder("Digite seu número de telefone").fill("1234");
  await page.getByPlaceholder("Digite seu email").fill("johndoe@test.com");

  page.getByRole("button", { name: "Finalizar cadastro" }).click();

  const toast = page.getByText("Ocorreu um erro ao cadastrar sua conta!");
  expect(toast).toBeVisible();
});
