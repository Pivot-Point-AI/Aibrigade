import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(100,116,139,0.14),transparent)]" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="container-custom relative text-center max-w-xl mx-auto">
        {/* 404 large display */}
        <div className="font-display font-700 text-[8rem] lg:text-[12rem] leading-none text-gradient-main opacity-15 mb-6 select-none">
          404
        </div>

        <div className="-mt-8 relative z-10">
          <h1 className="font-display font-600 text-3xl text-text-primary mb-4 leading-snug">
            Page not found
          </h1>
          <p className="text-text-secondary text-base mb-8 leading-relaxed">
            The page you're looking for doesn't exist or may have moved. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan to-cyan-dark text-background font-display font-600 text-sm rounded-xl hover:shadow-glow-cyan hover:scale-[1.02] transition-all"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-border text-text-secondary font-display font-600 text-sm rounded-xl hover:border-border-light hover:text-text-primary transition-all"
            >
              <Search className="w-4 h-4" />
              Browse Case Studies
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
