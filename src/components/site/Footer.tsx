import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card/40">
      <div className="container-narrow py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-serif text-lg text-navy font-semibold">Bizness Doctor</div>
          <p className="text-muted-foreground mt-1">Independent Financial Governance Architect</p>
        </div>
        <div className="text-muted-foreground">
          <p>Email: <a className="hover:text-navy" href="mailto:mobicosfinance@gmail.com">mobicosfinance@gmail.com</a></p>
          <p>Tel: <a className="hover:text-navy" href="tel:+447721991757">+44 7721 991757</a></p>
          <p>WhatsApp: <a className="hover:text-navy" href="https://wa.me/447721991757" target="_blank" rel="noopener">+44 7721 991757</a></p>
        </div>
        <div className="md:text-right text-muted-foreground space-y-1">
          <div className="flex md:justify-end gap-4">
            <Link to="/services" className="hover:text-navy">Services</Link>
            <Link to="/insights" className="hover:text-navy">Insights</Link>
            <Link to="/blog" className="hover:text-navy">Blog</Link>
            <Link to="/contact" className="hover:text-navy">Contact</Link>
          </div>
          <div className="text-xs">© {new Date().getFullYear()} Bizness Doctor. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
