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
  keywords: ["Maxence Leguéry", "portfolio", "computer science", "machine learning", "ENSTA Paris", "engineering student", "deep learning", "AI"],
  metadataBase: new URL("https://maxenceleguery.net"),
  openGraph: {
    title: "Maxence Leguéry - Portfolio | Machine Learning & Software Engineer",
    description: "French engineering student specialized in computer science - Portfolio showcasing projects, skills, and experience in machine learning and software development",
    url: "https://maxenceleguery.net",
    siteName: "Maxence Leguéry Portfolio",
    images: [
      {
        url: "/about.png",
        width: 1200,
        height: 630,
        alt: "Maxence Leguéry Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maxence Leguéry - Portfolio | Machine Learning & Software Engineer",
    description: "French engineering student specialized in computer science - Portfolio showcasing projects, skills, and experience in machine learning and software development",
    images: ["/about.png"],
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
        <link rel="canonical" href="https://maxenceleguery.net" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Maxence Leguéry",
              "jobTitle": "Computer Science Engineering Student",
              "affiliation": {
                "@type": "Organization",
                "name": "ENSTA Paris"
              },
              "url": "https://maxenceleguery.net",
              "sameAs": [
                "https://github.com/maxenceleguery",
                "https://www.linkedin.com/in/maxence-leguery"
              ],
              "knowsAbout": [
                "Machine Learning",
                "Deep Learning",
                "Computer Science",
                "Software Development",
                "Artificial Intelligence"
              ],
              "description": "French engineering student specialized in computer science with expertise in machine learning and software development"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
