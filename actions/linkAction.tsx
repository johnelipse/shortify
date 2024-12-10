/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { FormProps } from "@/components/Forms/linkForm";
import { db } from "@/lib/db";
import { ShortenedLink } from "@prisma/client";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
interface FetchSingleLinkResult {
  success: boolean;
  data?: ShortenedLink;
  error?: string;
}

export async function shortenLink(data: FormProps) {
  const cookieStore = cookies();
  let user = (await cookieStore).get("userId")?.value;

  if (!user) {
    user = nanoid(10);
    (await cookieStore).set("userId", user, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60,
    });
  }

  const { longUrl } = data;

  if (!longUrl) {
    return { error: "URL is required" };
  }

  try {
    new URL(longUrl);
  } catch (error) {
    console.log(error);
    return { error: "Invalid URL" };
  }

  try {
    const shortCode = nanoid(6);

    const existingLink = await db.shortenedLink.findUnique({
      where: { shortCode },
    });

    if (existingLink) {
      return shortenLink(data);
    }

    const shortenedLink = await db.shortenedLink.create({
      data: {
        longUrl,
        shortCode,
        userId: user,
      },
    });
    revalidatePath("/");
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
  const cookieStore = cookies();
  // const userId =  cookieStore.get("userId")?.value;
  const userId = (await cookieStore).get("userId")?.value;

  if (!userId) {
    return { error: "User not found" };
  }

  try {
    const links = await db.shortenedLink.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: links };
  } catch (error) {
    console.error("Error fetching links:", error);
    return { error: "Failed to fetch links. Please try again." };
  }
}

export async function fetchSingleLink(
  shortCode: string
): Promise<FetchSingleLinkResult> {
  if (!shortCode) {
    return { success: false, error: "Short code is required" };
  }

  try {
    const link = await db.shortenedLink.findFirst({
      where: {
        shortCode: shortCode,
      },
    });

    if (!link) {
      return { success: false, error: "Link not found" };
    }

    return { success: true, data: link };
  } catch (error) {
    console.error("Error fetching link:", error);
    return { success: false, error: "Failed to fetch link. Please try again." };
  }
}

export async function incrementClickCount(shortCode: string) {
  try {
    const updatedLink = await db.shortenedLink.update({
      where: { shortCode },
      data: { views: { increment: 1 } },
    });

    revalidatePath("/");
    return updatedLink.views;
  } catch (error) {
    console.error("Error incrementing click count:", error);
    return { success: false, error: "Failed to update click count" };
  }
}
