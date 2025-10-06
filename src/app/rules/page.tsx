import { lintParams } from "@/features/rules/lint";

const sampleLint = lintParams({
  params: {
    utm_source: "LinkedIn",
    utm_medium: "paid-social",
  },
  required: ["utm_campaign"],
  bannedValues: ["LinkedIn"],
});

export default function RulesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Rules playground</h1>
        <p className="text-sm text-slate-500">
          Draft declarative rules and preview violations before enforcing them workspace-wide.
        </p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">Preview violations</h2>
          <ul className="space-y-2 text-sm text-slate-600">
            {sampleLint.map((issue) => (
              <li key={`${issue.type}-${issue.field}`} className="rounded-2xl border border-slate-100/80 bg-slate-50/70 px-4 py-3">
                <p className="font-medium text-slate-900">{issue.field}</p>
                <p>{issue.message}</p>
                {issue.fix && <p className="text-xs text-emerald-500">Suggested fix: {issue.fix}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">Rule builder</h2>
          <p className="text-sm text-slate-500">
            Define triggers and actions (e.g. channel=facebook → utm_source=fb). Use approvals to activate.
          </p>
          <button className="rounded-2xl border border-dashed border-slate-300 px-4 py-3 text-xs text-slate-500 transition hover:border-slate-900 hover:text-slate-900">
            Open rule editor
          </button>
        </div>
      </div>
    </section>
  );
}
