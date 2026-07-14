import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Bizness Doctor" },
      {
        name: "description",
        content:
          "Corporate Tax & VAT governance, Fractional CFO oversight, cross-border structuring, financial oversight assessments, and personal wealth risk reviews.",
      },
      { property: "og:title", content: "Advisory Services — Bizness Doctor" },
      {
        property: "og:description",
        content:
          "Governance-led advisory across tax, financial oversight, structuring, and capital risk.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="container-narrow py-10 space-y-10">
      <header className="max-w-3xl">
        <span className="eyebrow">Services</span>
        <h1 className="text-3xl md:text-4xl font-serif leading-tight tracking-tight mt-4">
          Areas of advisory covering tax, oversight, governance, and capital risk.
        </h1>
      </header>

      <div id="corporate-tax" className="scroll-mt-28 rounded-xl border border-border bg-card p-7">
        <span className="inline-block rounded-full bg-accent text-navy text-xs font-bold px-3 py-1 mb-3">
          Typical Starting Point
        </span>
        <h2 className="text-2xl font-serif">Corporate Tax &amp; VAT Governance</h2>
        <p className="text-muted-foreground mt-3">
          Strategic review of corporate tax readiness, VAT exposure, and governance controls across
          operating structures, designed for businesses requiring oversight beyond filing and
          compliance.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          {[
            "Corporate tax readiness assessment",
            "VAT exposure mapping",
            "Compliance gap identification",
            "Governance and documentation review",
            "Risk visibility before issues become costly",
          ].map((i) => (
            <li key={i} className="flex gap-2"><span className="text-accent">•</span>{i}</li>
          ))}
        </ul>
        <Link to="/contact" className="mt-5 inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90">Assess Tax Exposure</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div id="cross-border" className="scroll-mt-28 rounded-xl border border-border bg-card p-7">
          <h3 className="text-xl font-serif">Cross-Border &amp; Corporate Structuring</h3>
          <p className="text-muted-foreground mt-3 text-sm">
            Support for companies entering, expanding, or reorganizing across UAE and international
            markets, with focus on structure, tax implications, financial impact, and practical
            structuring for Australian businesses establishing operations in the UAE.
          </p>
        </div>
        <div id="risk-diagnostic" className="scroll-mt-28 rounded-xl border border-border bg-card p-7">
          <h3 className="text-xl font-serif">UAE Financial Risk &amp; Tax Exposure Diagnostic</h3>
          <p className="text-muted-foreground mt-3 text-sm">
            A focused short-duration review for businesses needing early visibility into tax
            exposure, reporting weaknesses, control gaps, and working capital risk before broader
            engagement.
          </p>
        </div>
      </div>

      <div id="fractional-cfo" className="scroll-mt-28 rounded-xl border border-border bg-secondary p-7">
        <span className="inline-block rounded-full border border-navy/30 text-navy text-xs font-bold px-3 py-1 mb-3">
          Retainer Model
        </span>
        <h2 className="text-2xl font-serif">Fractional CFO &amp; Financial Oversight</h2>
        <p className="text-muted-foreground mt-3">
          Ongoing senior financial support for SMEs requiring stronger reporting discipline, cash
          flow discipline, budgeting structure, KPI visibility, and executive decision support
          without a full-time CFO.
        </p>
        <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          {[
            "Monthly management reporting",
            "Budgeting and rolling forecasts",
            "Cash flow and working capital oversight",
            "KPI and performance dashboards",
            "Bank and stakeholder reporting support",
          ].map((i) => (
            <li key={i} className="flex gap-2"><span className="text-accent">•</span>{i}</li>
          ))}
        </ul>
        <Link to="/contact" className="mt-5 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-muted">Discuss Retainer Support</Link>
      </div>

      <div id="oversight-assessment" className="scroll-mt-28 rounded-xl bg-navy text-primary-foreground p-7">
        <span className="inline-block rounded-full bg-accent text-navy text-xs font-bold px-3 py-1 mb-3">
          Premium Engagement
        </span>
        <h3 className="text-2xl font-serif text-primary-foreground">
          Independent Financial Oversight Assessment™
        </h3>
        <p className="text-primary-foreground/80 mt-3">
          A structured independent review for owners, investors, minority shareholders, and boards
          seeking visibility into leakage, control weakness, fraud indicators, and governance blind
          spots.
        </p>
        <p className="text-primary-foreground/80 mt-3">
          Delivered through the <strong>PRISM™ Governance Framework</strong> for situations
          requiring deeper financial integrity review and risk protection.
        </p>
        <Link to="/contact" className="mt-5 inline-flex items-center rounded-md border border-primary-foreground/30 bg-transparent px-4 py-2 text-sm text-primary-foreground hover:bg-primary-foreground/10">
          Request Oversight Assessment
        </Link>
      </div>

      <div id="wealth-review" className="scroll-mt-28 rounded-xl border border-border bg-card p-7">
        <h3 className="text-xl font-serif">Personal Wealth Risk &amp; Governance Review™</h3>
        <p className="text-muted-foreground mt-3 text-sm">
          A discreet, independent review for high-income professionals seeking capital risk clarity
          before committing to property, private ventures, or concentrated investment opportunities.
        </p>
      </div>

      {/* PRISM */}
      <section className="rounded-xl bg-secondary p-7 md:p-10">
        <span className="eyebrow">Methodology</span>
        <h2 className="text-3xl font-serif mt-3">Structured through the PRISM™ Governance Framework</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl">
          Selected engagements are delivered through a disciplined review framework designed to
          bring financial integrity, control visibility, and actionable governance clarity.
        </p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            ["P", "Profit Integrity", "Assessing margin quality, leakage, and reliability of reported performance."],
            ["R", "Receivable & Cash Discipline", "Reviewing working capital strain, collections discipline, and cash visibility."],
            ["I", "Internal Control Strength", "Identifying control gaps, weak approval environments, and governance blind spots."],
            ["S", "Structural Risk Review", "Evaluating corporate structure, regulatory implications, and commercial alignment."],
            ["M", "Monitoring & Tax Exposure", "Assessing tax readiness, compliance discipline, and monitoring strength."],
          ].map(([letter, title, body]) => (
            <div key={letter} className="rounded-lg bg-card border border-border p-5">
              <div className="size-9 rounded-full bg-navy text-primary-foreground inline-flex items-center justify-center font-bold mb-3">{letter}</div>
              <h4 className="font-serif text-base">{title}</h4>
              <p className="text-xs text-muted-foreground mt-2">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
