import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import stylesheet from "./app.css?url";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Space+Grotesk:wght@500;600;700&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="author" content="Static Studios" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <Meta />
        <Links />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Static Studios",
          "brand": {
            "@type": "Brand",
            "name": "Static"
          },
          "url": "https://staticstudios.net",
          "logo": "https://staticstudios.net/favicon.ico",
          "description": "Static Studios operates Static, a Minecraft Java Edition server network featuring custom Skyblock and Prison gamemodes.",
          "email": "support@staticstudios.net",
          "sameAs": [
            "https://discord.gg/9S6K9E5"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@staticstudios.net",
            "contactType": "customer support"
          }
        })}} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Static",
          "url": "https://staticstudios.net",
          "description": "Minecraft Java Edition server featuring custom Skyblock and Prison gamemodes.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://staticstudios.net/store?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_25%_15%,rgba(124,58,237,0.18),transparent_28rem),linear-gradient(180deg,#0b1029,#080b20)] p-4 text-white">
      <div className="surface-panel w-full max-w-3xl p-8 sm:p-12">
        <p className="page-eyebrow">Static</p>
        <h1 className="page-title">{message}</h1>
        <p className="page-lede">{details}</p>
        {stack && (
          <pre className="mt-6 w-full overflow-x-auto rounded-xl border border-white/10 bg-slate-950/55 p-4 text-sm text-slate-300">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}
