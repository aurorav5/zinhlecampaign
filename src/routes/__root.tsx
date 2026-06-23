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
      { name: "description", content: "Project Harmonize builds a professional, multi-page website for a music campaign, featuring artist bios, music, and campaign details." },
      { property: "og:description", content: "Project Harmonize builds a professional, multi-page website for a music campaign, featuring artist bios, music, and campaign details." },
      { name: "twitter:description", content: "Project Harmonize builds a professional, multi-page website for a music campaign, featuring artist bios, music, and campaign details." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9a05354c-e9f7-4a2c-9e57-2994448e21a2/id-preview-0d890dab--c117b7a9-5ecc-4c09-a2f5-2bcdcf52f917.lovable.app-1782155860066.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9a05354c-e9f7-4a2c-9e57-2994448e21a2/id-preview-0d890dab--c117b7a9-5ecc-4c09-a2f5-2bcdcf52f917.lovable.app-1782155860066.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
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
