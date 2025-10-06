"use client";

import { Command } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

const quickActions = [
  "Create link from template",
  "Paste URL → Build",
  "Approve template",
  "Open campaign health",
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 hidden rounded-2xl border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-500 shadow-card transition hover:-translate-y-1 hover:text-slate-900 sm:flex"
      >
        <Command className="mr-2 h-4 w-4" />
        Quick actions ⌘K
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-24 w-full max-w-lg -translate-x-1/2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card focus:outline-none">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200/60 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              <Command className="h-4 w-4" />
              <input
                placeholder="Search templates, campaigns, links"
                className="flex-1 bg-transparent outline-none"
              />
              <span className="rounded-lg bg-white px-2 py-1 text-xs text-slate-400">⌘K</span>
            </div>
            <div className="mt-4 space-y-1">
              {quickActions.map((action) => (
                <button
                  key={action}
                  className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-100"
                >
                  <span>{action}</span>
                  <kbd className="text-xs text-slate-400">↵</kbd>
                </button>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
