import { fetchSingleLink } from "@/actions/linkAction";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const shortCode = (await params).shortCode;
  const link = await fetchSingleLink(shortCode);
  return redirect(link?.data?.longUrl as string);
}
