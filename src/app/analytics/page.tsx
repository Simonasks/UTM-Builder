export default function AnalyticsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
        <p className="text-sm text-slate-500">
          Monitor short link performance, synced GA4 metrics, and anomaly detection.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">Shortener performance</h2>
          <p className="mt-2 text-sm text-slate-500">Realtime clicks, top sources, and device breakdown.</p>
          <div className="mt-4 h-40 rounded-2xl bg-slate-50" aria-hidden />
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">GA4 sync status</h2>
          <p className="mt-2 text-sm text-slate-500">Nightly reconciliation with anomaly flags.</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li className="rounded-2xl border border-slate-100/80 bg-slate-50/80 px-4 py-3">Last sync · 2 hours ago</li>
            <li className="rounded-2xl border border-slate-100/80 bg-slate-50/80 px-4 py-3">Anomalies · Campaign CPC spike</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
