"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl border border-cyan/40 bg-cyan/10 flex items-center justify-center text-cyan">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h1 className="font-display font-700 text-white text-xl">{title}</h1>
          {subtitle && <p className="text-text-muted text-sm">{subtitle}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/blog" target="_blank" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
          View Blog
        </Link>
        <Button variant="ghost" size="sm" onClick={handleLogout} iconLeft={<LogOut className="w-4 h-4" />}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
