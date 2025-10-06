const feed = [
  {
    actor: "Avery",
    action: "approved",
    target: "Paid social template v3",
    timestamp: "4m ago",
  },
  {
    actor: "Nina",
    action: "flagged",
    target: "Campaign launch Q2",
    timestamp: "22m ago",
  },
  {
    actor: "Leo",
    action: "commented",
    target: "Global naming taxonomy",
    timestamp: "1h ago",
  },
];

export function ActivityFeed() {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Activity</h2>
          <p className="text-sm text-slate-500">Audit log of governance actions across the workspace.</p>
        </div>
        <button className="rounded-2xl border border-slate-200/80 px-3 py-2 text-xs text-slate-500 transition hover:border-slate-900 hover:text-slate-900">
          Export
        </button>
      </header>
      <div className="mt-6 space-y-4">
        {feed.map((item) => (
          <div key={item.target} className="flex items-start justify-between rounded-2xl border border-slate-100/80 bg-slate-50/60 px-4 py-3">
            <div>
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{item.actor}</span> {item.action} <span className="font-medium text-slate-900">{item.target}</span>
              </p>
              <p className="text-xs text-slate-400">View history →</p>
            </div>
            <span className="text-xs text-slate-400">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
