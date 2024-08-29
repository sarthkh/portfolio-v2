import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ConvexClientProvider } from "./providers";
import { siteMetadata } from "./utils/site-metadata";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ url: siteMetadata.url }],
  creator: siteMetadata.name,
  openGraph: {
    type: siteMetadata.type,
    locale: siteMetadata.locale,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.url}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [`${siteMetadata.url}/images/og-image.jpg`],
    creator: siteMetadata.twitterHandle,
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
  alternates: {
    canonical: siteMetadata.url,
  },
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/icons/apple-touch-icon.png" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteMetadata.name,
              url: siteMetadata.url,
              jobTitle: "Software Developer",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <ConvexClientProvider>
          <div className="max-w-2xl mx-auto py-4 flex flex-col min-h-screen">
            <Header />
            {children}
            <div className="flex grow" />
            <Footer />
            <Analytics />
            <SpeedInsights />
          </div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
