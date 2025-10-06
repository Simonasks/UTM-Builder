"use client";

import { ToastViewport, ToastProvider } from "@radix-ui/react-toast";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <ToastProvider>
      <SonnerToaster richColors position="top-center" />
      <ToastViewport className="fixed top-0 z-50 flex w-full justify-center" />
    </ToastProvider>
  );
}
