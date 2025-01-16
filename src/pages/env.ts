import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["production", "development", "test"]),
  VITE_API_URL: z.string(),
});

// eslint-disable-next-line prettier/prettier
export const env = envSchema.parse(import.meta.env);
