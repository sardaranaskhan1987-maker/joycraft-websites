import { createFileRoute, Link } from "@tanstack/react-router";

const SITE_URL = "https://biznessdoctor.com";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Bizness Doctor" },
      {
        name: "description",
        content:
          "Senior finance leadership with 25+ years across UAE, KSA, Pakistan and global markets. FCPA Australia, CEPA contributor, governance-led advisory.",
      },
      { property: "og:title", content: "About Bizness Doctor — Independent. Structured. Decision-Focused." },
      {
        property: "og:description",
        content: "Independent governance advisory led by senior finance leadership.",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <article className="container-narrow py-16">
      <header className="max-w-3xl">
        <span className="eyebrow">About Bizness Doctor</span>
        <h1 className="text-4xl md:text-5xl font-serif mt-4">Independent. Structured. Decision-Focused.</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Bizness Doctor is an independent financial governance advisory practice focused on helping
          businesses, owners, and professionals gain clarity over tax exposure, financial control,
          and capital risk before critical decisions are made.
        </p>
      </header>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-border bg-card p-7">
          <h2 className="text-2xl font-serif">Not Accounting. Not Compliance. Not Product-Driven Advice.</h2>
          <p className="text-muted-foreground mt-3">
            The advisory approach is built on governance, oversight, and structured financial
            judgment rather than routine compliance or transaction-driven consulting.
          </p>
          <p className="text-muted-foreground mt-3">
            Engagements are designed for situations where financial information exists, but clarity,
            control, or confidence is limited.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-7">
          <h2 className="text-2xl font-serif">Led by Senior Finance Leadership Experience</h2>
          <p className="text-muted-foreground mt-3">
            The practice is led by a senior finance professional with over 25 years of international
            experience across the UAE, Saudi Arabia, Pakistan, and global markets.
          </p>
          <p className="text-muted-foreground mt-3">
            A Fellow Certified Practising Accountant (FCPA Australia), with specialization in UAE
            corporate tax and governance frameworks, and extensive exposure to complex operating
            environments requiring both commercial judgment and financial discipline.
          </p>
          <p className="text-muted-foreground mt-3">
            Contributed to policy-level submissions in the Australia–UAE Comprehensive Economic
            Partnership Agreement (CEPA) consultation process (
            <a
              className="text-accent underline"
              href="https://www.dfat.gov.au/sites/default/files/muhammad-saleem-uae-cepa-and-gcc-fta-submission.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              view submission
            </a>
            ).
          </p>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-4">
        {[
          "Corporate tax and VAT exposure, financial reporting reliability, and control gap visibility",
          "Cash flow discipline, working capital pressure, banking, and executive decision support",
          "Cross-border structuring, independent review, and governance-focused financial oversight",
        ].map((c) => (
          <div key={c} className="rounded-lg border border-border bg-card p-5 border-l-4 border-l-accent text-sm">
            {c}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link
          to="/contact"
          className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Book a 15-Minute Fit Call
        </Link>
      </div>
    </article>
  );
}
