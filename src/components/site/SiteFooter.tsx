import { Link } from "@tanstack/react-router";
import logoBadge from "@/assets/logo-badge.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/story", label: "The Story" },
  { to: "/music", label: "Music" },
  { to: "/campaign", label: "The Campaign" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/share", label: "Share" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--gold)]/15 bg-[color:var(--ink)] px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <img src={logoBadge} alt="ThatGuy Productions International" className="h-14 w-14 rounded-full" />
          <div>
            <p className="font-display text-base tracking-[0.18em] text-[color:var(--gold)]">
              THATGUY PRODUCTIONS INTERNATIONAL
            </p>
            <p className="mt-1 max-w-sm text-sm text-[color:var(--cream)]/65">
              Built into the Baviaanskloof. Recording the voices the world hasn't heard yet.
            </p>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-3">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-[color:var(--cream)]/75 hover:text-[color:var(--gold)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-[color:var(--gold)]/10 pt-6 text-xs text-[color:var(--cream)]/45">
        © {year} ThatGuy Productions International. All rights reserved.
      </div>
    </footer>
  );
}
