import type { MetaFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { Error } from "~/components/util"
import sharedStyles from "~/styles/shared.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "My First Remix App",
  viewport: "width=device-width,initial-scale=1",
});

type Props = {
  title?: string,
  children: React.ReactNode
}

export function Document({title, children}: Props) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        {/* custom font */ }
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap" rel="stylesheet" />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const CatchBoundary = () => {
  const caughtError = useCatch()

  return (
    <Document title={caughtError.statusText}>
      <main>
        <Error title={caughtError.statusText}>
          <p>{caughtError.data.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link> .</p>
        </Error>
      </main>
    </Document>
  )
}

export const ErrorBoundary = ({error}: {error: Error}) => {
  return (
    <Document title="An error occured">
      <main>
        <Error title="An error occured">
          <p>{error.message || "Something went wrong"}</p>
          <p>Back to <Link to="/">safety</Link> .</p>
        </Error>
      </main>
    </Document>
  )
}

export const links = () => [
  {rel: "stylesheet", href: sharedStyles},
]
