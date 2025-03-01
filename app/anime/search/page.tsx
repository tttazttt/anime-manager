import React, { Suspense } from "react";
import SearchPageClient from "@/components/anime/SearchPageClient";
const SearchPageServer = () => {
  return (
    <Suspense
      fallback={
        <div
          className="w-full grid content-center text-center text-3xl font-bold pb-20"
          id="container"
        >
          Loading...
        </div>
      }
    >
      <SearchPageClient />
    </Suspense>
  );
};

export default SearchPageServer;
