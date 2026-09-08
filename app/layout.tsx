import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Inter carries the running text; Newsreader is kept as an editorial accent for
// ledes, section standfirsts and project summaries.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Full-Stack Developer in Nepal`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Suraj Ghimire",
    "full-stack developer Nepal",
    "Next.js developer Nepal",
    "React developer Lumbini",
    "NestJS",
    "Fastify",
    "TypeScript",
    "GraphQL",
    "PostgreSQL",
    "Mahavi",
    "Bridgenext",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: site.url },
  openGraph: {
    type: "profile",
    url: site.url,
    title: `${site.name} — Full-Stack Developer`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Full-Stack Developer`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport = {
  themeColor: "#0b1a15",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: "Software Developer",
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lumbini",
      addressCountry: "NP",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Rajarambapu Institute of Technology, Sakharale",
    },
    worksFor: { "@type": "Organization", name: "Bridgenext" },
    memberOf: { "@type": "Organization", name: "Mahavi", url: "https://mahavi.tech" },
    knowsAbout: [
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "NestJS",
      "Fastify",
      "Node.js",
      ".NET",
      "GraphQL",
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Apache Kafka",
    ],
    sameAs: [site.github, site.linkedin],
    subjectOf: projects.slice(0, 6).map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      abstract: p.summary,
    })),
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="ambience" aria-hidden="true">
          <span className="grain" />
          <span className="vignette" />
        </div>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
