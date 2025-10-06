import { z } from "zod";

const lintInputSchema = z.object({
  params: z.record(z.string()),
  required: z.array(z.string()).default([]),
  bannedValues: z.array(z.string()).default([]),
});

export type LintResult = {
  type: "missing" | "banned" | "case";
  field: string;
  message: string;
  fix?: string;
};

export function lintParams(input: unknown): LintResult[] {
  const { params, required, bannedValues } = lintInputSchema.parse(input);
  const issues: LintResult[] = [];

  required.forEach((field) => {
    if (!params[field]) {
      issues.push({
        type: "missing",
        field,
        message: `${field} is required`,
      });
    }
  });

  Object.entries(params).forEach(([key, value]) => {
    if (bannedValues.includes(value)) {
      issues.push({
        type: "banned",
        field: key,
        message: `${value} is not allowed`,
      });
    }

    const normalized = value.replace(/-/g, "_").toLowerCase();
    if (value !== normalized) {
      issues.push({
        type: "case",
        field: key,
        message: `${key} should be lower_snake_case`,
        fix: normalized,
      });
    }
  });

  return issues;
}
