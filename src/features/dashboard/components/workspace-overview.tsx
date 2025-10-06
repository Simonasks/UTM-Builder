const cards = [
  {
    title: "Violations",
    value: "12",
    delta: "-4.1% vs last week",
    tone: "text-rose-500",
  },
  {
    title: "Active campaigns",
    value: "8",
    delta: "+2 launched",
    tone: "text-emerald-500",
  },
  {
    title: "Templates awaiting review",
    value: "3",
    delta: "1 urgent",
    tone: "text-amber-500",
  },
];

export function WorkspaceOverview() {
  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900">Workspace overview</h1>
        <p className="text-sm text-slate-500">
          Stay ahead of violations, approvals, and campaign readiness.
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="space-y-1 rounded-2xl border border-slate-100/80 bg-slate-50/40 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{card.title}</p>
            <p className="text-2xl font-semibold text-slate-900">{card.value}</p>
            <p className={`text-xs ${card.tone}`}>{card.delta}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
