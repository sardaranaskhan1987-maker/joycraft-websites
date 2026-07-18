import { Link } from "@tanstack/react-router";
import { useState, type SVGProps } from "react";

type NavLink = { to: string; hash?: string; label: string; description?: string };
type NavItem =
  | { type: "link"; to: string; label: string }
  | { type: "menu"; label: string; columns: { heading: string; links: NavLink[] }[] };

const nav: NavItem[] = [
  { type: "link", to: "/", label: "Home" },
  {
    type: "menu",
    label: "Services",
    columns: [
      {
        heading: "Tax & Governance",
        links: [
          { to: "/services", hash: "corporate-tax", label: "Corporate Tax & VAT Governance", description: "Readiness, exposure mapping & controls" },
          { to: "/services", hash: "cross-border", label: "Cross-Border & Corporate Structuring", description: "UAE & international expansion" },
          { to: "/services", hash: "risk-diagnostic", label: "Financial Risk & Tax Diagnostic", description: "Short-duration focused review" },
        ],
      },
      {
        heading: "Oversight & Advisory",
        links: [
          { to: "/services", hash: "oversight-assessment", label: "Independent Oversight Assessment™", description: "PRISM™ governance review" },
          { to: "/services", hash: "fractional-cfo", label: "Fractional CFO & Oversight", description: "Senior financial support on retainer" },
          { to: "/services", hash: "wealth-review", label: "Personal Wealth Risk Review™", description: "Capital risk clarity for individuals" },
        ],
      },
    ],
  },
  {
    type: "menu",
    label: "Training",
    columns: [
      {
        heading: "Programmes",
        links: [
          { to: "/training", hash: "executive-programme", label: "Executive Finance & Governance Programme", description: "Governance, reporting & decision-making" },
          { to: "/training", hash: "career-programme", label: "Finance Career Accelerator Programme", description: "GCC national talent development" },
          { to: "/training", hash: "custom-programmes", label: "Custom Corporate Programmes", description: "Tailored organisational learning" },
        ],
      },
    ],
  },
  {
    type: "menu",
    label: "Resources",
    columns: [
      {
        heading: "Knowledge",
        links: [
          { to: "/insights", label: "Insights", description: "Articles on governance & risk" },
          { to: "/blog", label: "Blog", description: "Latest publications" },
        ],
      },
    ],
  },

  { type: "link", to: "/about", label: "About" },
  { type: "link", to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const close = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
      <div className="container-narrow flex items-center justify-between py-5 gap-6">
        <Link to="/" className="flex flex-col leading-tight" onClick={close}>
          <span className="font-serif text-xl text-navy font-semibold">Bizness Doctor</span>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Financial Governance &amp; Risk Structuring Advisory
          </span>
        </Link>

        <button
          type="button"
          className="md:hidden p-2 rounded-md hover:bg-muted"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {nav.map((item) =>
            item.type === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-navy font-semibold" }}
                inactiveProps={{ className: "text-muted-foreground hover:text-navy" }}
                className="transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-navy transition-colors"
                  aria-expanded={openMenu === item.label}
                >
                  {item.label}
                  <ChevronDownIcon className="size-3.5" />
                </button>
                {openMenu === item.label && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                    <div
                      className="rounded-xl border border-border bg-background shadow-xl p-6 grid gap-6"
                      style={{
                        width: `min(90vw, ${item.columns.length * 320}px)`,
                        gridTemplateColumns: `repeat(${item.columns.length}, minmax(0, 1fr))`,
                      }}
                    >
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <div className="eyebrow mb-3">{col.heading}</div>
                          <ul className="space-y-3">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link
                                  to={l.to}
                                  hash={l.hash}
                                  onClick={close}
                                  className="block group"
                                >
                                  <div className="text-sm font-medium text-navy group-hover:underline">
                                    {l.label}
                                  </div>
                                  {l.description && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {l.description}
                                    </div>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
          <Link
            to="/contact"
            onClick={close}
            className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Book 15-Minute Fit Call
          </Link>
        </nav>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="container-narrow py-4 flex flex-col gap-1 text-sm">
            {nav.map((item) =>
              item.type === "link" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={close}
                  activeOptions={{ exact: item.to === "/" }}
                  activeProps={{ className: "text-navy font-semibold" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="py-2"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={item.label} className="border-t border-border first:border-t-0 py-2">
                  <button
                    type="button"
                    onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                    className="w-full flex items-center justify-between py-1 text-muted-foreground"
                  >
                    <span>{item.label}</span>
                    <ChevronDownIcon
                      className={`size-4 transition-transform ${openMenu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openMenu === item.label && (
                    <div className="pl-3 pt-2 space-y-3">
                      {item.columns.map((col) => (
                        <div key={col.heading}>
                          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                            {col.heading}
                          </div>
                          <ul className="space-y-1">
                            {col.links.map((l) => (
                              <li key={l.label}>
                                <Link
                                  to={l.to}
                                  hash={l.hash}
                                  onClick={close}
                                  className="block py-1 text-sm text-navy"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            <Link
              to="/contact"
              onClick={close}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Book 15-Minute Fit Call
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
