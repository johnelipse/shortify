import { fetchLinks } from "@/actions/linkAction";
import Home from "@/components/front/home";
import React from "react";

export default async function page() {
  // const localLinks = (await fetchAllLinks()) || {
  //   success: false,
  //   links: [],
  //   count: 0,
  // };
  const UserLinks = await fetchLinks();
  return (
    <div>
      <Home linksData={UserLinks} />
    </div>
  );
}
