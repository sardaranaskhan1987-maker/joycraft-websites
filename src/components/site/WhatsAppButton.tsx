import type { SVGProps } from "react";

const PHONE = "447721991757";

export function WhatsAppButton({
  message = "Hello Bizness Doctor, I'd like to discuss an advisory enquiry.",
}: { message?: string }) {
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg hover:opacity-90 transition"
    >
      <MessageCircleIcon className="size-5" />
      <span className="font-medium hidden sm:inline">WhatsApp</span>
    </a>
  );
}

function MessageCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
