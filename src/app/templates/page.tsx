const templates = [
  {
    id: "tmpl-paid-social",
    name: "Paid social",
    scope: "Workspace",
    version: 2,
    approved: true,
  },
  {
    id: "tmpl-email",
    name: "Lifecycle email",
    scope: "Organization",
    version: 1,
    approved: true,
  },
];

export default function TemplatesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Templates</h1>
            <p className="text-sm text-slate-500">Reusable recipes to launch compliant campaigns in seconds.</p>
          </div>
          <button className="rounded-2xl border border-slate-200/80 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-900 hover:text-slate-900">
            Draft template
          </button>
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <article key={template.id} className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
              <span>{template.scope}</span>
              <span>v{template.version}</span>
            </div>
            <h2 className="text-lg font-semibold text-slate-900">{template.name}</h2>
            <p className="text-sm text-slate-500">Ensure naming taxonomy compliance and accelerate approvals.</p>
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{template.approved ? "Approved" : "Pending"}</span>
              <button className="rounded-2xl border border-slate-200/80 px-3 py-2 text-xs transition hover:border-slate-900 hover:text-slate-900">
                Preview schema
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
