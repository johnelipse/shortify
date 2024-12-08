import { fetchAllLinks } from "@/actions/localStorageActions";
import Home from "@/components/front/home";
import React from "react";

export default async function page() {
  const localLinks = (await fetchAllLinks()) || {
    success: false,
    links: [],
    count: 0,
  };
  return (
    <div>
      <Home localLinks={localLinks} />
    </div>
  );
}
