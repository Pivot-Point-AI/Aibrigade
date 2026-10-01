import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../../lib/auth";
import LogoutButton from "../../../components/admin/LogoutButton";
import AdminNav from "../../../components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default async function ConsoleLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="adm-shell">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          <span className="adm-brand__mark" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-mark.png" alt="" width="26" height="26" />
          </span>
          <span className="adm-brand__text">
            AIBrigade
            <small>Blog admin</small>
          </span>
        </Link>

        <AdminNav />

        <div className="adm-side__foot">
          <div className="adm-user">
            <span className="adm-user__avatar" aria-hidden="true">
              {(session.email || "A").charAt(0).toUpperCase()}
            </span>
            <span className="adm-user__email" title={session.email}>{session.email}</span>
          </div>
          <LogoutButton />
        </div>
      </aside>

      <main className="adm-content">{children}</main>
    </div>
  );
}
