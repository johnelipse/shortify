"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { CircleCheckBig, Copy } from "lucide-react";

interface ShortenedLinkResultProps {
  shortUrl: string;
}

export function ShortenedLinkResult({ shortUrl }: ShortenedLinkResultProps) {
  const fullUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrl}`;

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setIsCopied(true);
      toast.success("Link copied successfully.");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast.error("failed to copy link.");
    }
  };

  return (
    <div className="mt-6 py-2 px-4 bg-white/10  rounded-lg flex items-center justify-between">
      <Link
        href={shortUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline text-[0.9rem] md:text-[1rem] truncate mr-2"
      >
        {fullUrl}
      </Link>
      <Button
        onClick={copyToClipboard}
        variant="ghost"
        className="hover:bg-none"
        size="icon"
      >
        {!isCopied ? (
          <Copy className="w-4 h-4 text-white" />
        ) : (
          <CircleCheckBig className="w-2 h-2 text-white" />
        )}
      </Button>
    </div>
  );
}
