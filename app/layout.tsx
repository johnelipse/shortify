import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  other: {
    "google-site-verification": "Sr5RR1ysT1vii9jDI2fm5p3Rbq-UeQPPYQK_p-7U3bU",
    "google-adsense-account": "ca-pub-5823452511055640",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Shortify",
    "URL shortener",
    "Link shortener",
    "Shorten URLs",
    "Custom short links",
    "URL management",
    "Secure link sharing",
    "Real-time link analytics",
    "Trackable short links",
    "Fast URL shortening",
  ],
  authors: [
    {
      name: "shortify",
      url: siteConfig.url,
    },
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  creator: "John Banyweire",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@johnbanyweire",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-body`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
