const campaigns = [
  {
    id: "cmp-launch",
    name: "Spring launch",
    status: "In review",
    links: 24,
    violations: 2,
  },
  {
    id: "cmp-summit",
    name: "Summit 2024",
    status: "Approved",
    links: 16,
    violations: 0,
  },
];

export default function CampaignsPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Campaigns</h1>
            <p className="text-sm text-slate-500">Standardized briefs and their governed link sets.</p>
          </div>
          <button className="rounded-2xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800">
            New campaign
          </button>
        </div>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50/80 text-left text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-6 py-3">Campaign</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Links</th>
              <th className="px-6 py-3">Violations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="transition hover:bg-slate-50/80">
                <td className="px-6 py-4 text-slate-900">{campaign.name}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {campaign.status}
                  </span>
                </td>
                <td className="px-6 py-4">{campaign.links}</td>
                <td className="px-6 py-4">
                  {campaign.violations ? (
                    <span className="text-rose-500">{campaign.violations}</span>
                  ) : (
                    <span className="text-emerald-500">Clean</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
