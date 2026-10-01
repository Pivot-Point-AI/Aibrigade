import Link from "next/link";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function PostNotFound() {
  return (
    <>
      <Navbar />
      <main className="bl">
        <header className="bl-hero">
          <div className="bl-wrap bl-wrap--narrow">
            <h1 className="bl-hero__title">That post isn&apos;t here</h1>
            <p className="bl-hero__lead">It may have been unpublished or the link is mistyped.</p>
            <Link href="/blog" className="bl-btn">Browse all posts</Link>
          </div>
        </header>
      </main>
      <Footer />
    </>
  );
}
