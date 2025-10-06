import { UtmBuilderForm } from "@/features/builder/components/utm-builder-form";
import { HydrateClient } from "@/components/hydrate-client";

export const dynamic = "force-dynamic";

export default function BuilderPage() {
  return (
    <section className="grid gap-8">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Link builder</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          Build, lint, and share UTM-friendly campaign links with governed templates. Collaboration-ready with inline approvals.
        </p>
      </div>
      <HydrateClient>
        <UtmBuilderForm />
      </HydrateClient>
    </section>
  );
}
