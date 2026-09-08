# Wording & Heading Clean-up

## Changes

1. **About page — link text**
   - Change the CEPA link text `(view submission)` to `(Official DFAT Submission)` in `src/routes/about.tsx`.

2. **Remove dots from multi-part headings, use `|` as separator**
   - About page H1: `Independent. Structured. Decision-Focused.` → `Independent | Structured | Decision-Focused`
   - Home page H2: `Independent Financial Advisory. Not Accounting. Not Product Sales.` → `Independent Financial Advisory | Not Accounting | Not Product Sales`
   - Services page H1: `Areas of advisory covering tax, oversight, governance, and capital risk.` → remove the trailing `.`
   - Update the matching `og:title` meta on the About page.

No other pages, cards, or layouts change.

## Where the contact form submissions go (answering your question)

When someone clicks **Request Consultation**:
- The submission is saved in your website's database (table: contact submissions).
- You can view every submission at **/admin/submissions** after signing in at **/auth** with `admin@biznessdoctor.com` / `Saleem@Bizness123`.
- It can also be forwarded automatically to a Google Sheet, but that needs the Google Apps Script webhook URL to be added as a secret first — currently it is not set, so submissions only go to the database.

Optional follow-up (not in this plan): if you give me the Google Sheet webhook URL, I can connect the form so every enquiry also lands in your Sheet/email.
