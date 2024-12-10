"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { CircleCheckBig, Copy, Eye } from "lucide-react";

interface ShortenedLinkResultProps {
  shortUrl: string;
  initialViews?: number;
}

export function ShortenedLinkResult({
  shortUrl,
  initialViews,
}: ShortenedLinkResultProps) {
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
  // const router = useRouter();
  // const [views, setViews] = useState(initialViews);

  // const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   const result = await incrementClickCount(shortUrl);
  //   if (result.success) {
  //     setViews(result.views);
  //     window.open(fullUrl, "_blank");
  //     router.refresh();
  //   } else {
  //     toast.error("Failed to update view count.");
  //   }
  // };

  return (
    <div className="mt-6 py-2 px-4 bg-white/10  rounded-lg flex items-center justify-between">
      <Link
        href={shortUrl}
        // onClick={handleLinkClick}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline text-[0.9rem] md:text-[1rem] truncate mr-2"
      >
        {fullUrl}
      </Link>
      <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-1 text-white">
          <Eye className="w-4 h-4" />
          {initialViews}
        </div>
      </div>
    </div>
  );
}
