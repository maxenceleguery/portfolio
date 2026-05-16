import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maxence Leguéry - Portfolio | Machine Learning & Software Engineer",
  description: "French engineering student specialized in computer science - Portfolio showcasing projects, skills, and experience in machine learning and software development",
  authors: [{ name: "Maxence Leguéry" }],
  keywords: ["Maxence Leguéry", "portfolio", "freelance AI engineer", "machine learning", "ENSTA Paris", "Podtech", "Buddy AI Note", "deep learning", "AI", "Next.js"],
  metadataBase: new URL("https://maxenceleguery.net"),
  alternates: {
    canonical: "https://maxenceleguery.net",
  },
  openGraph: {
    title: "Maxence Leguéry - Portfolio | Machine Learning & Software Engineer",
    description: "Freelance AI engineer based in Paris, working with Podtech on Buddy AI Note. Portfolio showcasing AI, machine learning, and full-stack engineering projects.",
    url: "https://maxenceleguery.net",
    siteName: "Maxence Leguéry Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxence Leguéry - Portfolio | Machine Learning & Software Engineer",
    description: "Freelance AI engineer based in Paris, working with Podtech on Buddy AI Note. Portfolio showcasing AI, machine learning, and full-stack engineering projects.",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
        <link rel="preload" as="image" href="/background.webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Maxence Leguéry",
              "jobTitle": "Freelance AI Engineer",
              "worksFor": {
                "@type": "Organization",
                "name": "Podtech",
                "url": "https://podtech.tech/"
              },
              "alumniOf": {
                "@type": "Organization",
                "name": "ENSTA Paris",
                "url": "https://www.ensta-paris.fr/"
              },
              "url": "https://maxenceleguery.net",
              "sameAs": [
                "https://github.com/maxenceleguery",
                "https://www.linkedin.com/in/maxence-leguery"
              ],
              "knowsAbout": [
                "Machine Learning",
                "Deep Learning",
                "Artificial Intelligence",
                "Full-stack Engineering",
                "Next.js",
                "TypeScript"
              ],
              "description": "Freelance AI engineer building production AI products end to end, currently shipping Buddy AI Note with Podtech."
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        
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
