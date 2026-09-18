import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageTransition from "@/components/PageTransition";
import SkipLink from "@/components/SkipLink";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Display headline face: carries the new typographic hierarchy (§9 of the
// redesign brief) so headings stop leaning on IBM Plex Mono for weight.
// Mono is now reserved for technical metadata/labels/numbers only.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://novuslabshq.com"),
  title: {
    default: "Novus Labs: Custom Software for Manual Operations",
    template: "%s | Novus Labs",
  },
  description:
    "Novus Labs builds custom software for businesses still run on registers, spreadsheets, and WhatsApp. A rent system, an order bot, a document pipeline: manual, repetitive work replaced with the software that does it instead.",
  icons: { icon: "/brand/logo.svg" },
  openGraph: {
    type: "website",
    title: "Novus Labs: Custom Software for Manual Operations",
    description: "Whatever your team does by hand every day, we build the software that does it instead.",
    url: "https://novuslabshq.com/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${ibmPlexMono.variable} ${inter.variable} ${spaceGrotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        {/* Organization schema only: name, URL, logo, and the public LinkedIn
            presence. Never add client names, project client details, or any
            identifying information here — this is public, indexable data. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Novus Labs",
              url: "https://novuslabshq.com",
              logo: "https://novuslabshq.com/brand/logo.svg",
              description:
                "Founder-led studio building custom software for businesses still run on registers, spreadsheets, and WhatsApp.",
              sameAs: ["https://www.linkedin.com/company/novus-labs-tech/"],
            }),
          }}
        />
        <div className="bg-grid" aria-hidden="true" />
        <SkipLink />
        <SiteNav />
        <main id="main-content" className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <SiteFooter />
        <BackToTop />
        <CustomCursor />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
