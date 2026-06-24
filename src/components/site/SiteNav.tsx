import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logoBadge from "@/assets/logo-badge.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/story", label: "The Story" },
  { to: "/music", label: "Music" },
  { to: "/campaign", label: "The Campaign" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
  { to: "/epk", label: "Press Kit" },
  { to: "/share", label: "Share" },
] as const;

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "bg-[color:var(--ink)]/95 backdrop-blur border-b border-[color:var(--gold)]/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="ThatGuy Productions International — home">
          <img src={logoBadge} alt="" className="h-10 w-10 rounded-full" />
          <span className="hidden font-display text-sm tracking-[0.18em] text-[color:var(--gold)] sm:block">
            THATGUY PRODUCTIONS
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="gold-underline text-sm text-[color:var(--cream)]/85 hover:text-[color:var(--gold)] data-[status=active]:text-[color:var(--gold)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-[color:var(--cream)] md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t border-[color:var(--gold)]/15 bg-[color:var(--ink)] px-5 pb-6 pt-2 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="block py-3 text-base text-[color:var(--cream)]/90 hover:text-[color:var(--gold)] data-[status=active]:text-[color:var(--gold)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
