import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bizness Doctor | Financial Governance & Risk Structuring Advisory" },
      {
        name: "description",
        content:
          "Independent corporate, tax, and capital risk advisory for businesses and high-income professionals across the UAE and international markets.",
      },
      { property: "og:title", content: "Bizness Doctor — Independent Financial Governance Advisory" },
      {
        property: "og:description",
        content:
          "Governance-led advisory on tax exposure, financial oversight, and capital risk for UAE and international businesses.",
      },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:title", content: "Bizness Doctor — Independent Financial Governance Advisory" },
      {
        name: "twitter:description",
        content:
          "Governance-led advisory on tax exposure, financial oversight, and capital risk for UAE and international businesses.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Bizness Doctor",
          url: SITE_URL,
          email: "mobicosfinance@gmail.com",
          telephone: "+447721991757",
          description:
            "Independent financial governance and risk structuring advisory for businesses and high-income professionals.",
          areaServed: ["AE", "AU", "International"],
        }),
      },
    ],
  }),
  component: HomePage,
});

const trust = [
  "25+ years international finance leadership",
  "FCPA (Australia)",
  "CEPA policy contributor (Australia–UAE corridor)",
  "Independent and commission-free",
];

const positioning = [
  {
    title: "Tax & Governance Clarity",
    body: "For businesses needing visibility into corporate tax readiness, VAT exposure, and governance controls beyond filing and compliance.",
  },
  {
    title: "Financial Oversight",
    body: "For SMEs requiring stronger reporting discipline, cash visibility, and senior decision support.",
  },
  {
    title: "Independent Risk Review",
    body: "For owners, investors, and professionals seeking disciplined assessment before committing capital.",
  },
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-narrow py-16 md:py-24 grid md:grid-cols-[1.4fr_1fr] gap-10 items-start">
        <div>
          <span className="eyebrow">Independent Advisory</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-serif leading-[1.05] max-w-[14ch]">
            Financial Governance &amp; Risk Structuring Advisory
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Independent advisory for businesses and high-income professionals seeking clarity on
            corporate structure, tax exposure, financial oversight, and capital risk across the UAE
            — including cross-border structuring for international and Australian businesses
            entering the UAE market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Book a 15-Minute Fit Call
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-3 text-sm font-medium hover:bg-muted"
            >
              Explore Services
            </Link>
          </div>
          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {trust.map((t) => (
              <div key={t} className="text-sm text-muted-foreground border-l-2 border-accent pl-3">
                {t}
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-xl border border-border bg-card p-6 md:p-7 shadow-sm">
          <span className="eyebrow">Why Clients Engage</span>
          <div className="mt-4 space-y-5">
            <div>
              <h3 className="text-lg font-serif">Before tax exposure becomes costly</h3>
              <p className="text-sm text-muted-foreground mt-1">
                When corporate tax readiness, VAT exposure, or governance discipline needs review
                before problems escalate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-serif">When financial visibility feels weak</h3>
              <p className="text-sm text-muted-foreground mt-1">
                When reporting exists, but confidence in numbers, controls, or cash discipline
                remains limited.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-serif">When a business needs senior oversight</h3>
              <p className="text-sm text-muted-foreground mt-1">
                When an SME requires decision support and financial control without the cost of a
                full-time CFO.
              </p>
            </div>
          </div>
        </aside>
      </section>

      {/* Positioning */}
      <section className="container-narrow py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif">
            Independent Financial Governance. Not Accounting. Not Product Sales.
          </h2>
          <p className="text-lg text-muted-foreground mt-4">
            Bizness Doctor provides governance-led financial advisory for clients who need
            structured thinking before making financial, tax, or capital decisions. We are not a
            bookkeeping firm, a business setup agent, or an investment product distributor.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {positioning.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xl font-serif">{p.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-navy text-primary-foreground">
        <div className="container-narrow py-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <h2 className="text-3xl font-serif text-primary-foreground">
              Discuss your situation with structured clarity.
            </h2>
            <p className="text-primary-foreground/80 mt-2">
              A short, structured 15-minute discussion to determine whether advisory support is the
              right fit.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 text-sm font-medium text-navy hover:opacity-90"
          >
            Book a Fit Call
          </Link>
        </div>
      </section>
    </>
  );
}
