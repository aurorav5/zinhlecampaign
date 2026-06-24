import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="bg-night flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-[color:var(--gold)]">404</h1>
        <h2 className="mt-4 font-display text-xl text-[color:var(--cream)]">Page not found</h2>
        <p className="mt-2 text-sm text-[color:var(--cream)]/70">
          That road doesn't lead anywhere. Try heading home.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] hover:opacity-90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="bg-night flex min-h-dvh items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-[color:var(--cream)]">This page didn't load</h1>
        <p className="mt-2 text-sm text-[color:var(--cream)]/70">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--gold)] px-5 py-2.5 text-sm font-medium text-[color:var(--ink)] hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--gold)]/50 px-5 py-2.5 text-sm font-medium text-[color:var(--cream)] hover:border-[color:var(--gold)]"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "She Sang to a Tortoise — ThatGuy Productions International" },
      {
        name: "description",
        content:
          "A true story from the Baviaanskloof, Eastern Cape — and a campaign to give a 19-year-old voice the financial footing she needs.",
      },
      { property: "og:site_name", content: "She Sang to a Tortoise" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#08080a" },
      { property: "og:title", content: "She Sang to a Tortoise — ThatGuy Productions International" },
      { name: "twitter:title", content: "She Sang to a Tortoise — ThatGuy Productions International" },
      { property: "og:description", content: "A true story from the Baviaanskloof, Eastern Cape — and a campaign to give a 19-year-old voice the financial footing she needs." },
      { name: "twitter:description", content: "A true story from the Baviaanskloof — and a campaign to give a 19-year-old voice the financial footing she needs." },
      { name: "google-site-verification", content: "REPLACE_WITH_GSC_VERIFICATION_CODE" },
      { property: "og:image", content: "https://zinhlecampaign.lovable.app/og-image.jpg" },
      { name: "twitter:image", content: "https://zinhlecampaign.lovable.app/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preload", as: "image", href: "/og-image.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://zinhlecampaign.lovable.app/#organization",
              "name": "ThatGuy Productions International",
              "url": "https://zinhlecampaign.lovable.app",
              "description": "Independent music production label founded by Phil Bölke, based in the Baviaanskloof, Eastern Cape, South Africa.",
              "founder": {
                "@type": "Person",
                "name": "Phil Bölke",
                "jobTitle": "Producer & Engineer",
                "affiliation": "ThatGuy Productions International"
              },
              "sameAs": [
                "https://www.facebook.com/ThatGuyOfficial",
                "https://www.tiktok.com/@thatguy_productions",
                "https://www.youtube.com/@ThatGuy-realest"
              ]
            },
            {
              "@type": "WebSite",
              "@id": "https://zinhlecampaign.lovable.app/#website",
              "url": "https://zinhlecampaign.lovable.app",
              "name": "She Sang to a Tortoise",
              "publisher": { "@id": "https://zinhlecampaign.lovable.app/#organization" }
            }
          ]
        }) }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-night min-h-dvh">
        <SiteNav />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
        <Toaster richColors position="top-center" theme="dark" />
      </div>
    </QueryClientProvider>
  );
}
