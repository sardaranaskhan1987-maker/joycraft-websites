import { useState, type FormEvent } from "react";
import { Mail, Phone, MessageCircle, CalendarIcon } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { submitContact } from "@/lib/contact.functions";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30",
];

const TIMEZONES = [
  "Europe/London", "Europe/Dublin", "Europe/Paris", "Europe/Berlin", "Europe/Madrid",
  "Europe/Zurich", "Europe/Istanbul", "Asia/Dubai", "Asia/Riyadh", "Asia/Karachi",
  "Asia/Kolkata", "Asia/Singapore", "Asia/Hong_Kong", "Asia/Tokyo", "Australia/Sydney",
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Sao_Paulo", "UTC",
];

function getDefaultTimezone(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) return tz;
  } catch {}
  return "Europe/London";
}

const Schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

export function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date | undefined>();
  const [bookingTime, setBookingTime] = useState<string>("");
  const [bookingTimezone, setBookingTimezone] = useState<string>(getDefaultTimezone);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const baseMessage = (fd.get("message") as string) ?? "";
    const bookingLine =
      bookingDate && bookingTime
        ? `[Requested call slot: ${format(bookingDate, "EEEE, d MMMM yyyy")} at ${bookingTime} (${bookingTimezone})]\n\n`
        : "";
    const finalMessage = bookingLine + baseMessage;

    const parsed = Schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      subject: fd.get("subject") || undefined,
      message: finalMessage,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    try {
      await submitContact({ data: parsed.data });
      setSubmitted(true);
      form.reset();
      setBookingDate(undefined);
      setBookingTime("");
      setBookingTimezone(getDefaultTimezone());
      toast.success("Thank you — we'll be in touch shortly.");
    } catch (err) {
      console.error(err);
      toast.error("Could not send your message. Please try again or use WhatsApp/email.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container-narrow py-10 max-w-4xl">
      <header className="max-w-2xl">
        <span className="eyebrow">Contact</span>
        <h1 className="text-3xl md:text-4xl font-serif leading-tight tracking-tight mt-4">Book a 15-Minute Fit Call</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Initial discussions are focused on understanding whether your situation requires structured
          financial advisory, tax governance review, or ongoing financial oversight.
        </p>
      </header>

      <div className="mt-6 grid md:grid-cols-[1fr_1fr] gap-6">
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h2 className="text-xl font-serif">Direct Enquiry</h2>
          <a href="mailto:info@biznessdoctor.com" className="flex items-center gap-3 hover:text-navy">
            <Mail className="size-5 text-accent" />
            <span>info@biznessdoctor.com</span>
          </a>
          <a href="tel:+971554725790" className="flex items-center gap-3 hover:text-navy">
            <Phone className="size-5 text-accent" />
            <span>+971-55-4725790</span>
          </a>
          <a
            href="https://wa.me/971554725790?text=Hello%20Bizness%20Doctor%2C%20I'd%20like%20to%20book%20a%20fit%20call."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-navy"
          >
            <MessageCircle className="size-5 text-[#25D366]" />
            <span>WhatsApp +971-55-4725790</span>
          </a>


          <div className="pt-4 border-t border-border">
            <p className="text-sm font-semibold">This conversation is relevant if:</p>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
              <li>You have concerns around corporate tax or VAT exposure</li>
              <li>Financial reports exist but lack clarity or reliability</li>
              <li>Cash flow pressure persists despite reported profitability</li>
              <li>You require senior financial oversight without a full-time CFO</li>
              <li>You are making a significant business or capital decision</li>
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4" noValidate>
          <h2 className="text-xl font-serif">Send a Message</h2>

          {submitted && (
            <div className="rounded-md bg-secondary border border-border p-3 text-sm">
              Thank you. Your message has been received — we'll be in touch shortly.
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="c-name">Name</label>
            <input id="c-name" name="name" required maxLength={100} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="c-email">Email</label>
              <input id="c-email" name="email" type="email" required maxLength={255} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="c-phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></label>
              <input id="c-phone" name="phone" maxLength={30} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="c-subject">Subject <span className="text-muted-foreground font-normal">(optional)</span></label>
            <input id="c-subject" name="subject" maxLength={200} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <div className="rounded-md border border-border p-3 space-y-3">
            <p className="text-sm font-medium">Preferred call slot <span className="text-muted-foreground font-normal">(optional)</span></p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !bookingDate && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {bookingDate ? format(bookingDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={bookingDate}
                    onSelect={setBookingDate}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const day = date.getDay();
                      return date < today || day === 0 || day === 6;
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                disabled={!bookingDate}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm disabled:opacity-60"
              >
                <option value="">Pick a time</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium mb-1" htmlFor="c-tz">Timezone</label>
              <select
                id="c-tz"
                value={bookingTimezone}
                onChange={(e) => setBookingTimezone(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              >
                {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz.replace(/_/g, " ")}</option>)}
              </select>
            </div>
            <p className="text-xs text-muted-foreground">Mon–Fri, 30-minute slots. We'll confirm by email.</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="c-msg">Message</label>
            <textarea id="c-msg" name="message" required maxLength={5000} rows={5} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send Enquiry"}
          </button>
          <p className="text-xs text-muted-foreground">
            All discussions are treated with strict confidentiality. Independent financial advisory provided on a commission-free basis.
          </p>
        </form>
      </div>
    </div>
  );
}