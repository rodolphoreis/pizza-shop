import { http, HttpResponse } from "msw";
import { GetPopularProductsResponse } from "../get-popular-products";
export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsResponse
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    { product: "Margherita", amount: 5 },
    { product: "Pepperoni", amount: 3 },
    { product: "Quatro Formaggi", amount: 2 },
    { product: "Calabresa", amount: 7 },
    { product: "Frango Catupiry", amount: 4 },
  ]);
});
