import { z } from "zod";

export const utmParamSchema = z.object({
  baseUrl: z.string().url({ message: "Enter a valid URL" }),
  source: z.string().min(1, "Required").regex(/^[a-z0-9_\-]+$/, "lowercase, hyphen or underscore"),
  medium: z.string().min(1, "Required").regex(/^[a-z0-9_\-]+$/, "lowercase, hyphen or underscore"),
  campaign: z.string().min(1, "Required").regex(/^[a-z0-9_\-]+$/, "lowercase, hyphen or underscore"),
  term: z.string().optional(),
  content: z.string().optional(),
  custom: z
    .array(
      z.object({
        key: z
          .string()
          .min(1)
          .regex(/^[a-z0-9_\-]+$/, "lowercase, hyphen or underscore"),
        value: z
          .string()
          .min(1)
          .regex(/^[a-z0-9_\-]+$/, "lowercase, hyphen or underscore"),
      })
    )
    .default([]),
});

export type UtmPayload = z.infer<typeof utmParamSchema>;
