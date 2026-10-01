"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Sign in failed. Try again.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="adm-form" noValidate>
      <label className="adm-field">
        <span className="adm-label">Email</span>
        <input
          className="adm-input" type="email" autoComplete="username" required autoFocus
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="adm-field">
        <span className="adm-label">Password</span>
        <input
          className="adm-input" type="password" autoComplete="current-password" required
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error && <div className="adm-alert adm-alert--error" role="alert">{error}</div>}
      <button className="adm-btn adm-btn--primary adm-btn--block" disabled={busy || !email || !password}>
        {busy ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
