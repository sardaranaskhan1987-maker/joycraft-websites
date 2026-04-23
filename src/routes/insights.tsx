import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

const insights = [
  {
    title: "Why Many SMEs Are Not Truly Ready for Corporate Tax",
    body: "For many businesses, readiness is treated as a filing exercise. In practice, true readiness is a visibility and control issue. Financial data may exist, but the structure behind it is often inconsistent or insufficiently reviewed.",
  },
  {
    title: "Profit Does Not Equal Cash Flow",
    body: "It is not uncommon for businesses to report profits while still experiencing cash pressure. The gap often reflects receivables delays, weak working capital discipline, or poor monitoring. Strong businesses do not just measure profit.",
  },
  {
    title: "When Financial Reports Cannot Be Fully Relied Upon",
    body: "In many SME environments, the real question is not whether reports exist, but whether they can be relied upon with confidence. Inconsistent classifications, manual adjustments, and limited review can reduce reporting reliability.",
  },
];

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights | Bizness Doctor" },
      {
        name: "description",
        content:
          "Practical, governance-led commentary on tax exposure, financial control, cross-border structuring, and capital risk.",
      },
      { property: "og:title", content: "Insights — Bizness Doctor" },
      {
        property: "og:description",
        content: "Structured perspectives for owners, executives, and investors.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/insights" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <div className="container-narrow py-16">
      <header className="max-w-3xl">
        <span className="eyebrow">Insights</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-4">
          Practical, governance-led commentary on tax, financial control, structuring &amp; capital risk.
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Structured perspectives for business owners, executives, and investors seeking clearer
          financial visibility before making decisions.
        </p>
      </header>

      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {insights.map((i) => (
          <article key={i.title} className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl font-serif">{i.title}</h2>
            <p className="text-muted-foreground mt-2 text-sm">{i.body}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-xl border border-border bg-secondary p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-serif">For longer-form analysis, visit our blog.</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Articles published periodically on tax, governance, and financial structure.
          </p>
        </div>
        <Link
          to="/blog"
          className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm text-primary-foreground hover:opacity-90"
        >
          Read the Blog
        </Link>
      </div>
    </div>
  );
}
