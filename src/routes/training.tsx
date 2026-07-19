import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training | Bizness Doctor" },
      {
        name: "description",
        content:
          "Executive finance, governance, career development, and custom corporate programmes from Bizness Doctor.",
      },
      { property: "og:title", content: "Training — Bizness Doctor" },
      {
        property: "og:description",
        content:
          "Practical executive programmes strengthening finance capability, governance, and workplace readiness.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/training" }],
  }),
  component: TrainingPage,
});

function TrainingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-primary-foreground">
        <div className="px-4 md:px-8 py-12 md:py-16 max-w-3xl">
          <span className="eyebrow text-accent">Executive Development</span>
          <h1 className="text-3xl md:text-5xl font-serif text-primary-foreground leading-tight mt-2">
            Training
          </h1>
          <p className="text-primary-foreground/85 mt-4 text-base md:text-lg">
            Practical executive programmes designed to strengthen finance capability, governance,
            leadership, and workplace readiness across businesses, government entities, educational
            institutions, and national workforce development initiatives.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-md bg-accent text-navy px-5 py-2.5 text-sm font-semibold hover:opacity-90"
            >
              Discuss Training Requirements
            </Link>
            <a
              href="#programmes"
              className="inline-flex items-center rounded-md border border-primary-foreground/40 px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              View Programmes
            </a>
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section id="programmes" className="container-narrow -mt-8 relative z-10 space-y-6">
        {/* Featured */}
        <article
          id="executive-programme"
          className="scroll-mt-28 rounded-xl border border-border bg-card shadow-sm p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-[112px_1fr] items-start">
            <div
              aria-hidden
              className="size-24 md:size-28 rounded-2xl bg-navy text-accent font-serif text-5xl flex items-center justify-center"
            >
              G
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-serif leading-tight">
                Executive Finance &amp; Governance Programme
              </h2>
              <p className="text-muted-foreground mt-3 text-sm md:text-base max-w-2xl">
                Strengthening financial governance, management reporting, executive decision-making,
                and sustainability awareness for finance teams.
              </p>

              <div className="mt-6 pt-4 border-t border-border">
                <div className="eyebrow">Programme Focus</div>
                <div className="mt-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                    "Financial Governance & Internal Controls",
                    "Management Reporting Excellence",
                    "Executive Decision-Making",
                    "Cash Flow & Financial Performance",
                    "Corporate Tax & VAT Awareness",
                    "Sustainability Awareness",
                  ].map((f) => (
                    <div
                      key={f}
                      className="min-h-24 rounded-md border border-border p-3 text-xs text-center flex items-center justify-center"
                    >
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
                >
                  Request Programme Details
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Supporting */}
        <div className="relative grid md:grid-cols-2 gap-5">
          <span id="career-programme" className="absolute -top-28" />
          <span id="custom-programmes" className="absolute -top-28" />
          <article
            className="rounded-xl border border-border bg-card p-6 flex flex-col"
          >
            <h3 className="text-xl font-serif leading-tight">
              Finance Career Accelerator Programme
            </h3>
            <p className="text-muted-foreground mt-2 text-sm flex-grow">
              Supporting the development of GCC national talent through practical finance
              capability, workplace readiness, and professional development.
            </p>
            <div className="eyebrow mt-4">Typical Participants</div>
            <ul className="mt-2 mb-5 space-y-1.5 text-sm text-muted-foreground">
              {[
                "Finance graduates",
                "Early-career finance professionals",
                "Graduate trainee programmes",
                "National talent initiatives",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {i}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
            >
              Explore Programme
            </Link>
          </article>

          <article
            id="custom-programmes"
            className="scroll-mt-28 rounded-xl border border-border bg-card p-6 flex flex-col"
          >
            <h3 className="text-xl font-serif leading-tight">Custom Corporate Programmes</h3>
            <p className="text-muted-foreground mt-2 text-sm flex-grow">
              Tailored programmes designed to strengthen your organisation's finance, governance,
              sustainability, and business capabilities.
            </p>
            <div className="eyebrow mt-4">Delivery Options</div>
            <ul className="mt-2 mb-5 space-y-1.5 text-sm text-muted-foreground">
              {[
                "In-house workshops",
                "Executive masterclasses",
                "Capability development programmes",
                "Bespoke organisational learning",
              ].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent">•</span>
                  {i}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="inline-flex w-fit items-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
            >
              Discuss Custom Programme
            </Link>
          </article>
        </div>
      </section>

      {/* Why */}
      <section className="container-narrow py-12 md:py-16">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="eyebrow">Why Bizness Doctor</span>
          <h2 className="text-2xl md:text-3xl font-serif mt-2 leading-tight">
            Practical programmes grounded in finance leadership experience
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            [
              "01",
              "Practical Experience",
              "Programmes developed from more than 25 years of international finance leadership rather than academic theory alone.",
            ],
            [
              "02",
              "Business-Relevant Learning",
              "Focused on practical application, executive decision-making, financial governance, and commercial capability.",
            ],
            [
              "03",
              "Flexible Delivery",
              "Available as executive briefings, workshops, in-house programmes, and customised organisational learning.",
            ],
          ].map(([n, title, body]) => (
            <article key={n} className="rounded-xl border border-border bg-card p-6">
              <div className="size-10 rounded-full bg-navy text-accent inline-flex items-center justify-center font-bold mb-3">
                {n}
              </div>
              <h3 className="text-lg font-serif leading-tight">{title}</h3>
              <p className="text-muted-foreground text-sm mt-2">{body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Delivery formats */}
      <section className="container-narrow pb-12">
        <div className="max-w-2xl mx-auto text-center mb-6">
          <span className="eyebrow">Delivery Formats</span>
          <h2 className="text-2xl md:text-3xl font-serif mt-2 leading-tight">
            Programme delivery tailored to organisational needs
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            "Executive Briefings",
            "Half-Day Workshops",
            "One-Day Programmes",
            "Multi-Day Development Programmes",
            "Corporate In-House Delivery",
            "Government & Educational Institutions",
          ].map((d) => (
            <div
              key={d}
              className="min-h-28 rounded-xl border border-border bg-card p-4 flex items-center justify-center text-center text-sm font-semibold text-navy"
            >
              {d}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-primary-foreground">
        <div className="container-narrow py-10 md:py-12 grid md:grid-cols-[1fr_auto] items-center gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-primary-foreground leading-tight">
              Strengthen Finance Capability Across Your Organisation
            </h2>
            <p className="text-primary-foreground/85 mt-3 text-sm md:text-base max-w-2xl">
              Whether developing finance teams, supporting GCC national talent, or designing
              customised corporate programmes, Bizness Doctor delivers practical executive learning
              aligned with today's business, governance, and financial leadership requirements.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md bg-accent text-navy px-5 py-3 text-sm font-semibold hover:opacity-90 whitespace-nowrap"
          >
            Discuss Training Requirements
          </Link>
        </div>
      </section>
    </div>
  );
}
