import type { Metadata } from "next";
import { Archivo, Martian_Mono, Michroma } from "next/font/google";
import "./globals.css";
import "./deck.css";
import { EMAIL, GITHUB, LANGUAGES, LINKEDIN, MISSIONS } from "@/lib/data";

const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" });
const martian = Martian_Mono({ subsets: ["latin"], variable: "--font-martian" });

const title = "Maxence Leguéry, freelance engineer: products, AI and cloud";
const description =
  "Freelance engineer in Paris. I build web, mobile and AI products and run the cloud infrastructure under them (Terraform, GCP, AWS). Recent work: Relevé, Adenor, Cutforge, Buddy AI Note.";

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Maxence Leguéry" }],
  keywords: ["Maxence Leguéry", "freelance engineer", "freelance CTO", "Terraform", "GCP", "AWS", "machine learning", "Next.js", "React Native", "ENSTA Paris", "Relevé", "Adenor", "Cutforge", "Buddy AI Note"],
  metadataBase: new URL("https://maxenceleguery.net"),
  alternates: { canonical: "https://maxenceleguery.net" },
  openGraph: {
    title,
    description,
    url: "https://maxenceleguery.net",
    siteName: "Maxence Leguéry",
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const SITE = "https://maxenceleguery.net";
const APP_TYPE: Record<string, string> = { releve: "MobileApplication", adenor: "VideoGame" };

// One graph: the profile page, its person, the site, and each mission as an app.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": `${SITE}/#site`, url: SITE, name: "Maxence Leguéry", inLanguage: "en" },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#page`,
      url: SITE,
      name: title,
      isPartOf: { "@id": `${SITE}/#site` },
      mainEntity: { "@id": `${SITE}/#me` },
    },
    {
      "@type": "Person",
      "@id": `${SITE}/#me`,
      name: "Maxence Leguéry",
      url: SITE,
      image: `${SITE}/about.webp`,
      email: `mailto:${EMAIL}`,
      jobTitle: "Freelance engineer",
      description:
        "Freelance engineer building web, mobile and AI products end to end, and the cloud infrastructure they run on. CTO for Podtech.",
      address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
      worksFor: { "@type": "Organization", name: "Podtech", url: "https://podtech.tech/" },
      alumniOf: { "@type": "CollegeOrUniversity", name: "ENSTA Paris", url: "https://www.ensta-paris.fr/" },
      knowsLanguage: LANGUAGES.map((l) => l.name),
      sameAs: [GITHUB, LINKEDIN],
      knowsAbout: [
        "Machine Learning",
        "Deep Learning",
        "Full-stack Engineering",
        "Cloud Infrastructure",
        "Terraform",
        "Google Cloud Platform",
        "Amazon Web Services",
        "Next.js",
        "React Native",
        "TypeScript",
        "Rust",
        "CUDA",
        "WebGPU",
      ],
    },
    ...MISSIONS.map((m) => ({
      "@type": APP_TYPE[m.id] ?? "SoftwareApplication",
      name: m.name,
      description: `${m.kicker}. ${m.summary}`,
      url: m.links[0]?.href,
      applicationCategory: m.id === "adenor" ? "GameApplication" : "DeveloperApplication",
      ...(m.id === "releve" ? { operatingSystem: "iOS, Android", applicationCategory: "GameApplication" } : { operatingSystem: "Web browser" }),
      author: { "@id": `${SITE}/#me` },
    })),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${michroma.variable} ${archivo.variable} ${martian.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NS7QKF4W');`,
          }}
        />
        {/* End Google Tag Manager */}

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1b2a" />
        <link rel="preload" as="image" href="/media/blackhole-poster.jpg" fetchPriority="high" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NS7QKF4W"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {children}
      </body>
    </html>
  );
}
