"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelsTopLeft, Rocket, Settings, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";

const navigation = [
  { name: "Dashboard", href: "/", icon: PanelsTopLeft },
  { name: "Builder", href: "/builder", icon: Rocket },
  { name: "Campaigns", href: "/campaigns", icon: Sparkles },
  { name: "Templates", href: "/templates", icon: Sparkles },
  { name: "Rules", href: "/rules", icon: Sparkles },
  { name: "Analytics", href: "/analytics", icon: Sparkles },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <CommandMenu />
      <aside
        className={cn(
          "hidden lg:flex w-72 flex-col justify-between border-r border-slate-200/80 bg-white/70 backdrop-blur-sm",
          "p-8"
        )}
      >
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
              go.utms
            </div>
            <span className="text-sm font-medium text-slate-500">Demo Workspace</span>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active
                      ? "bg-slate-900 text-white shadow-card"
                      : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-2xl border border-slate-200/80 p-4 text-xs text-slate-500">
          <p className="font-semibold text-slate-900">Realtime collaboration</p>
          <p>Invite teammates to co-edit templates and enforce org-wide guardrails.</p>
        </div>
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/20"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          />
          <nav className="relative z-50 flex w-64 flex-col gap-3 bg-white p-6 shadow-card">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition",
                    active ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-100/80 hover:text-slate-900"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
      <div className="flex-1">
        <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/70 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <button
              className="lg:hidden rounded-2xl border border-slate-200/80 bg-white p-2"
              onClick={() => setOpen((prev) => !prev)}
              aria-label="Toggle navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">Workspace health</p>
              <h1 className="text-lg font-semibold text-slate-900">
                {navigation.find((item) => item.href === pathname)?.name ?? "Workspace"}
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="hidden sm:inline">Sierra Quinn</span>
              <span className="h-8 w-8 rounded-full bg-slate-900/90" aria-hidden />
            </div>
          </div>
        </header>
        <main className="px-4 py-10 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-6xl space-y-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
