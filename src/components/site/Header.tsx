import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/insights", label: "Insights" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between py-5 gap-6 flex-wrap">
        <Link to="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-xl text-navy font-semibold">Bizness Doctor</span>
          <span className="text-xs text-muted-foreground">
            Financial Governance &amp; Risk Structuring Advisory
          </span>
        </Link>

        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-muted"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <nav
          className={`${open ? "flex" : "hidden"} md:flex w-full md:w-auto flex-col md:flex-row items-start md:items-center gap-4 md:gap-7 text-sm`}
        >
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-navy font-semibold" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-navy" }}
              className="transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Book 15-Minute Fit Call
          </Link>
        </nav>
      </div>
    </header>
  );
}
