const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hrty.vercel.app";
export const siteConfig = {
  name: "Shortify",
  title: "Shortify - Simplify Your Links with Powerful URL Shortening",
  url: baseUrl,
  ogImage: "/og.webp",
  description:
    "Transform long URLs into sleek, shareable links with Shortify. Enjoy fast, secure, and efficient URL shortening with real-time analytics. Simplify your links today!",
  links: {
    github: "https://github.com/johnelipse",
  },
};

export type SiteConfig = typeof siteConfig;
