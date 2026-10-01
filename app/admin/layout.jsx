import "./admin.css";

export const metadata = {
  title: "Admin | AIBrigade",
  robots: { index: false, follow: false },
};

// The overlay sits above the marketing-site chrome (cursor ring, story rail, preloader)
// so the console is a clean, self-contained surface.
export default function AdminRootLayout({ children }) {
  return <div className="adm">{children}</div>;
}
