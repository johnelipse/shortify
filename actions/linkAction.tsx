"use server";

import { FormProps } from "@/components/Forms/linkForm";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";

export async function shortenLink(data: FormProps) {
  const longUrl = data.longUrl as string;

  if (!longUrl) {
    return { error: "URL is required" };
  }

  try {
    // Validate URL
    new URL(longUrl);
  } catch (error) {
    console.log(error);
    return { error: "Invalid URL" };
  }

  try {
    // Generate a unique short code
    const shortCode = nanoid(6); // Generates a 6-character unique ID

    // Check if the short code already exists (unlikely, but possible)
    const existingLink = await db.shortenedLink.findUnique({
      where: { shortCode },
    });

    if (existingLink) {
      // In the rare case of a collision, generate a new code
      return shortenLink(data);
    }

    // Create the shortened link in the database
    const shortenedLink = await db.shortenedLink.create({
      data: {
        longUrl,
        shortCode,
      },
    });
    return {
      success: true,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortenedLink.shortCode}`,
      data: shortenedLink,
    };
  } catch (error) {
    console.error("Error shortening link:", error);
    return { error: "Failed to shorten link. Please try again." };
  }
}

export async function fetchLinks() {
  try {
    const links = await db.shortenedLink.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return links;
  } catch (error) {
    console.log(error);
  }
}

export async function getSingleLink(shortCode: string) {
  try {
    const link = await db.shortenedLink.findUnique({
      where: { shortCode: shortCode },
    });
    return link;
  } catch (error) {
    console.log(error);
  }
}
