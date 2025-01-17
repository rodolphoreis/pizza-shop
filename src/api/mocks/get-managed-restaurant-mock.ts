import { http, HttpResponse } from "msw";
import { GetProfileUserResponse } from "../get-profile-user";
import { GetManagedRestaurantResponse } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantResponse
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "restaurant-12345",
    name: "Pizza Shop",
    createdAt: new Date("2023-06-15T12:00:00Z"),
    updatedAt: new Date("2025-01-16T15:30:00Z"),
    description:
      "Um restaurante sofisticado com pratos internacionais e uma carta de vinhos selecionada.",
    managerId: "manager-67890",
  });
});
