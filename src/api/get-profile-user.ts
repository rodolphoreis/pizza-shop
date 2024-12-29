import { api } from "@/lib/axios.ts";

export interface GetProfileUserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
}

export async function getProfileUser() {
  const response = await api.get<GetProfileUserResponse>("/me");
  return response.data;
}
