import { redirect } from "next/navigation";
import { getSession } from "../../../lib/auth";
import LoginForm from "../../../components/admin/LoginForm";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSession()) redirect("/admin");
  return (
    <main className="adm-login">
      <section className="adm-login__art" aria-hidden="true">
        <div className="adm-brand adm-brand--light">
          <span className="adm-brand__mark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand-mark.png" alt="" width="26" height="26" />
          </span>
          <span className="adm-brand__text">AIBrigade</span>
        </div>
        <div>
          <p className="adm-eyebrow">Blog admin</p>
          <h2>Publish ideas that <em>move the field.</em></h2>
          <p>Write, schedule and manage every article on the AIBrigade blog from one place.</p>
        </div>
      </section>
      <section className="adm-login__panel">
        <h1 className="adm-login__title">Welcome back</h1>
        <p className="adm-login__lead">Sign in to manage the blog.</p>
        <LoginForm />
      </section>
    </main>
  );
}
