/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchSingleLink, incrementClickCount } from "@/actions/linkAction";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const shortCode = (await params).shortCode;
  const link = await fetchSingleLink(shortCode);
  const views = await incrementClickCount(shortCode);
  return redirect(link?.data?.longUrl as string);
}
