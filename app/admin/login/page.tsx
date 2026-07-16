"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { GlowOrbs } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

const INPUT =
  "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-[rgba(232,243,255,0.45)] border bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.35)] focus:border-[rgba(0,212,255,0.55)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,212,255,0.15)] transition-all";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setLoading(false);

    if (!data.success) {
      setError(data.error ?? "Invalid password");
      return;
    }

    const next = searchParams.get("next") || "/admin/blog";
    router.push(next);
    router.refresh();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,212,255,0.1),transparent)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <GlowOrbs />
      </div>

      <div className="container-custom relative w-full max-w-md">
        <div className="bg-surface border border-border rounded-2xl shadow-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl border border-cyan/40 bg-cyan/10 flex items-center justify-center text-cyan">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-display font-700 text-white text-lg">Admin Sign In</h1>
              <p className="text-text-muted text-xs">Blog content management</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono font-700 tracking-[0.22em] uppercase text-[rgba(232,243,255,0.85)] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${INPUT} pl-11`}
                  placeholder="Enter admin password"
                  autoFocus
                  required
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button type="submit" variant="primary" size="md" className="w-full" loading={loading}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
