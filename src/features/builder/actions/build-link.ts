import { utmParamSchema } from "@/features/builder/types/schemas";

export function buildFinalUrl(input: unknown) {
  const parsed = utmParamSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors } as const;
  }

  const params = new URLSearchParams();
  params.set("utm_source", parsed.data.source);
  params.set("utm_medium", parsed.data.medium);
  params.set("utm_campaign", parsed.data.campaign);
  if (parsed.data.term) params.set("utm_term", parsed.data.term);
  if (parsed.data.content) params.set("utm_content", parsed.data.content);
  parsed.data.custom.forEach(({ key, value }) => {
    params.set(key, value);
  });

  const finalUrl = `${parsed.data.baseUrl.replace(/\/$/, "")}?${params.toString()}`;

  return { success: true, finalUrl } as const;
}
