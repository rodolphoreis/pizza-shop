import { http, HttpResponse } from "msw";
import { GetProfileUserResponse } from "../get-profile-user";

export const getProfileMock = http.get<never, never, GetProfileUserResponse>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "1",
      name: "John Doe",
      email: "johndoe@test.com",
      phone: "1234",
      role: "manager",
      createdAt: new Date("2022-01-01T00:00:00Z"),
      updatedAt: new Date("2022-01-31T23:59:59Z"),
    });
  }
);
