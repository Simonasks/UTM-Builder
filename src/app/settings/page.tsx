export default function SettingsPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage organization domains, roles, and governance settings.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">Access</h2>
          <p className="text-sm text-slate-500">Owners, admins, editors, viewers with SAML SSO & SCIM provisioning.</p>
          <button className="rounded-2xl border border-slate-200/80 px-4 py-2 text-xs text-slate-600 transition hover:border-slate-900 hover:text-slate-900">
            Manage members
          </button>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card">
          <h2 className="text-sm font-semibold text-slate-900">Shortener</h2>
          <p className="text-sm text-slate-500">Connect go.example.com and configure reserved codes with auto-tagging.</p>
          <button className="rounded-2xl border border-slate-200/80 px-4 py-2 text-xs text-slate-600 transition hover:border-slate-900 hover:text-slate-900">
            Configure domain
          </button>
        </div>
      </div>
    </section>
  );
}
