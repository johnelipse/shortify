/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LinkForm from "../Forms/linkForm";
import { ShortenedLinkResult } from "./view-link";
import { ShortenedLink } from "@prisma/client";

export default function Home({
  linksData,
}: {
  linksData: {
    success?: boolean;
    data?: ShortenedLink[];
    error?: string;
  } | null;
}) {
  const links = linksData?.success ? linksData.data : null;

  return (
    <div className="min-h-screen bg-[#020B2C] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#FF6B6C]" />
      <div className="absolute top-40 right-20 w-2 h-2 rounded-full bg-[#3B82F6]" />
      <div className="absolute bottom-20 left-1/4 w-3 h-3 rounded-full bg-[#3B82F6]" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rotate-45 bg-white/10" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-[#FF6B6C]" />

      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center relative z-10">
        <Link href="/" className="flex items-center gap-1">
          <div className="relative h-8 w-24">
            <span className="text-white text-2xl font-bold">Shortify</span>
            <div className="absolute -right-1 top-0 w-2 h-2 rounded-full bg-[#FF6B6C]" />
            <div className="absolute -right-3 -top-1 w-2 h-2 rounded-full bg-[#3B82F6]" />
          </div>
        </Link>
        <Button
          variant="outline"
          disabled
          className="bg-[#1A2B6D] text-white border-[#2A3B7D] hover:bg-[#2A3B7D] hover:text-white"
        >
          Refer Friend
        </Button>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-180px)] relative z-10">
        <div className="max-w-3xl w-full text-center space-y-6">
          <h1 className="text-[1.4rem] md:text-5xl font-bold text-white leading-tight">
            Welcome to <span className="text-[#FF6B6C]">Shortify</span>,
            Simplify Your <span className="text-[#FF6B6C]">Links</span>, Amplify
            Your <span className="text-[#FF6B6C]">Reach</span>!
          </h1>
          <p className="text-gray-300 text-[0.9rem] md:text-[1.1rem]">
            Transform URLs effortlessly – sleek, fast, secure, powerful with
            Shortify.
          </p>
          <div>
            <LinkForm />
          </div>
        </div>
        <div className="max-w-2xl mt-10 w-full text-center space-y-6">
          {links?.map((link: any) => {
            return (
              <ShortenedLinkResult
                key={link.id}
                initialViews={link.views}
                shortUrl={link.shortCode}
              />
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-6 left-0 right-0 text-center text-sm text-gray-400">
        <p className="flex items-center justify-center gap-2">
          ⭐ Project By
          <Link
            href="https://john-banyweire.vercel.app"
            className="text-white hover:text-[#FF6B6C]"
          >
            Banyweire John
          </Link>
        </p>
      </footer>
    </div>
  );
}
