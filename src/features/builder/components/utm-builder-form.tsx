"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { utmParamSchema, type UtmPayload } from "@/features/builder/types/schemas";

const defaultValues: UtmPayload = {
  baseUrl: "https://www.example.com/pricing",
  source: "newsletter",
  medium: "email",
  campaign: "product_launch",
  term: "",
  content: "",
  custom: [],
};

async function requestBuildLink(payload: UtmPayload) {
  const response = await fetch("/api/links/build", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const { errors } = await response.json();
    throw errors;
  }
  return response.json() as Promise<{ finalUrl: string }>;
}

export function UtmBuilderForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const form = useForm<UtmPayload>({
    resolver: zodResolver(utmParamSchema),
    defaultValues,
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "custom",
  });

  const mutation = useMutation({
    mutationFn: requestBuildLink,
    onSuccess: ({ finalUrl }) => {
      setPreview(finalUrl);
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(finalUrl).catch(() => undefined);
      }
      toast.success("Link generated", { description: "Final URL copied to clipboard" });
    },
    onError: (errors: Record<string, string[]>) => {
      Object.entries(errors).forEach(([key, value]) => {
        form.setError(key as keyof UtmPayload, { message: value.join(" ") });
      });
      toast.error("Validation failed", {
        description: "Check highlighted fields",
      });
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      className="grid gap-6 rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-card"
    >
      <div>
        <h2 className="text-lg font-semibold text-slate-900">UTM Builder</h2>
        <p className="text-sm text-slate-500">
          Enforce naming taxonomy and generate links consistently. All parameters are automatically formatted to lower_snake_case.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Base URL" error={form.formState.errors.baseUrl?.message}>
          <input
            {...form.register("baseUrl")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="https://..."
          />
        </Field>
        <Field label="Source" error={form.formState.errors.source?.message}>
          <input
            {...form.register("source")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="newsletter"
          />
        </Field>
        <Field label="Medium" error={form.formState.errors.medium?.message}>
          <input
            {...form.register("medium")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="email"
          />
        </Field>
        <Field label="Campaign" error={form.formState.errors.campaign?.message}>
          <input
            {...form.register("campaign")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="launch_q2"
          />
        </Field>
        <Field label="Term" error={form.formState.errors.term?.message}>
          <input
            {...form.register("term")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="keyword"
          />
        </Field>
        <Field label="Content" error={form.formState.errors.content?.message}>
          <input
            {...form.register("content")}
            className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
            placeholder="cta_button"
          />
        </Field>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">Custom parameters</h3>
          <button
            type="button"
            onClick={() => append({ key: "", value: "" })}
            className="rounded-2xl border border-slate-200/80 px-3 py-2 text-xs text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
          >
            Add param
          </button>
        </div>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <Field label="Key" error={form.formState.errors.custom?.[index]?.key?.message}>
                  <input
                    {...form.register(`custom.${index}.key` as const)}
                    className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
                    placeholder="utm_region"
                  />
                </Field>
              </div>
              <div className="flex-1">
                <Field label="Value" error={form.formState.errors.custom?.[index]?.value?.message}>
                  <input
                    {...form.register(`custom.${index}.value` as const)}
                    className="w-full rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:shadow-card"
                    placeholder="emea"
                  />
                </Field>
              </div>
              <button
                type="button"
                onClick={() => remove(index)}
                className="self-end rounded-2xl border border-slate-200/80 px-3 py-2 text-xs text-slate-500 transition hover:border-rose-500/40 hover:bg-rose-50 hover:text-rose-600"
                aria-label="Remove custom param"
              >
                Remove
              </button>
            </div>
          ))}
          {fields.length === 0 && (
            <p className="rounded-2xl border border-dashed border-slate-200/80 px-4 py-4 text-xs text-slate-400">
              No custom parameters yet. Use your governance rules to maintain consistency.
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-4 text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-900">Live preview</span>
          <button
            type="submit"
            className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Building…" : "Build & copy"}
          </button>
        </div>
        <code className="overflow-hidden text-ellipsis rounded-xl bg-white px-4 py-3 text-xs text-slate-600">
          {preview ?? "https://www.example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=product_launch"}
        </code>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-600">
      <span className="font-medium text-slate-900">{label}</span>
      {children}
      {error && <span className="text-xs text-rose-500">{error}</span>}
    </label>
  );
}
