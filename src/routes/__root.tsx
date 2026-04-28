import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

import appCss from "../styles.css?url";

const SITE_URL = "https://biznessdoctor.com";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-serif text-navy">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0F2742" },
      { name: "author", content: "Bizness Doctor" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Bizness Doctor" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "Bizness Doctor" },
      { name: "description", content: "Independent financial governance and risk structuring advisory." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <DeferredToaster />
    </div>
  );
}

function DeferredToaster() {
  const [ToasterComponent, setToasterComponent] = useState<ComponentType<{
    richColors?: boolean;
    position?: "top-center";
  }> | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = () => {
      import("@/components/ui/sonner").then(({ Toaster }) => {
        if (mounted) setToasterComponent(() => Toaster);
      });
    };
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(load, { timeout: 2000 });
      return () => {
        mounted = false;
        win.cancelIdleCallback?.(id);
      };
    }

    const id = window.setTimeout(load, 1000);
    return () => {
      mounted = false;
      window.clearTimeout(id);
    };
  }, []);

  return ToasterComponent ? <ToasterComponent richColors position="top-center" /> : null;
}

export { SITE_URL };
