/* eslint-disable prefer-const */
"use server";

import { nanoid } from "nanoid";
import { cookies } from "next/headers";

// Define the type for the form input
interface FormProps {
  longUrl: string;
}

// Define the type for the ShortenedLink model
export interface ShortenedLink {
  id: string;
  longUrl: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
}

export async function shortenLink2(data: FormProps) {
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

    // Retrieve existing links from cookies
    const cookieStore = cookies();
    const existingLinksJson = (await cookieStore).get("shortenedLinks")?.value;
    const storedLinks: ShortenedLink[] = existingLinksJson
      ? JSON.parse(existingLinksJson)
      : [];

    // Check if the short code already exists
    const existingLink = storedLinks.find(
      (link) => link.shortCode === shortCode
    );

    if (existingLink) {
      // In the rare case of a collision, recursively try again
      return shortenLink2(data);
    }

    // Create the new shortened link
    const newLink: ShortenedLink = {
      id: nanoid(), // Generate a unique ID
      longUrl,
      shortCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add the new link to the stored links
    const updatedLinks = [...storedLinks, newLink];
    // Save to cookies
    (
      await // Save to cookies
      cookieStore
    ).set("shortenedLinks", JSON.stringify(updatedLinks), {
      httpOnly: false,
      path: "/",
      maxAge: 5 * 24 * 60 * 60, // 30 days
    });

    return {
      success: true,
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`,
      data: newLink,
    };
  } catch (error) {
    console.error("Error shortening link:", error);
    return { error: "Failed to shorten link. Please try again." };
  }
}

export async function getLinkByShortCode(shortCode: string) {
  const cookieStore = await cookies();
  const existingLinksJson = cookieStore.get("shortenedLinks")?.value;
  const storedLinks: ShortenedLink[] = existingLinksJson
    ? JSON.parse(existingLinksJson)
    : [];

  return storedLinks.find((link) => link.shortCode === shortCode);
}

export async function fetchAllLinks() {
  try {
    // Retrieve existing links from cookies
    const cookieStore = cookies();
    const existingLinksJson = (await cookieStore).get("shortenedLinks")?.value;

    // Parse the links or return an empty array if no links exist
    const storedLinks: ShortenedLink[] = existingLinksJson
      ? JSON.parse(existingLinksJson)
      : [];

    // Sort links by creation date (most recent first)
    const sortedLinks = storedLinks.sort((a, b) => {
      // Convert date strings to timestamps, placing most recent first
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return {
      success: true,
      links: sortedLinks,
      count: sortedLinks.length,
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return {
      success: false,
      error: "Failed to fetch links. Please try again.",
      links: [],
      count: 0,
    };
  }
}

export async function deleteLink(shortCode: string) {
  try {
    const cookieStore = await cookies();
    const existingLinksJson = cookieStore.get("shortenedLinks")?.value;

    let storedLinks: ShortenedLink[] = existingLinksJson
      ? JSON.parse(existingLinksJson)
      : [];

    // Filter out the link with the matching short code
    const updatedLinks = storedLinks.filter(
      (link) => link.shortCode !== shortCode
    );

    // Update the cookies with the filtered links
    cookieStore.set("shortenedLinks", JSON.stringify(updatedLinks), {
      httpOnly: false,
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return {
      success: true,
      message: "Link deleted successfully",
      links: updatedLinks,
      count: updatedLinks.length,
    };
  } catch (error) {
    console.error("Error deleting link:", error);
    return {
      success: false,
      error: "Failed to delete link. Please try again.",
      links: [],
      count: 0,
    };
  }
}
