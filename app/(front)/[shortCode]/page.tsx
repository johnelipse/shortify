import { getLinkByShortCode } from "@/actions/localStorageActions";
import { redirect } from "next/navigation";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ shortCode: string }>;
}) {
  const shortCode = (await params).shortCode;
  const link = await getLinkByShortCode(shortCode);
  return redirect(link?.longUrl as string);
}
