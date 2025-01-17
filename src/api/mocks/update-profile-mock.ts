import { http, HttpResponse } from "msw";
import { SignInBody } from "../sign-in";
import { RegisterRestaurantBody } from "../register-restaurant";
import { UpdateProfileProps } from "../update-profile";

export const updateProfileMock = http.put<never, UpdateProfileProps>(
  "/profile",
  async ({ request }) => {
    const { name } = await request.json();

    if (name === "Reis Shop") {
      return new HttpResponse(null, {
        status: 204,
      });
    }

    return new HttpResponse(null, { status: 400 });
  }
);
