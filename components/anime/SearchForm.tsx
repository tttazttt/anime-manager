"use client";
import React, { useRef, useState } from "react";
import { MaterialSymbolsSearchCheck2Outline } from "../elements/SearchButton";
import { useRouter } from "next/navigation";

const SearchForm = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    const query = titleRef.current?.value;
    if (!query) {
      setError(true);
      return;
    } else {
      router.push(`/anime/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div
      className="container mx-auto flex justify-center items-center"
      id="container"
    >
      <form
        onSubmit={(e) => handleSearch(e)}
        className="flex gap-5 justify-center items-center w-full pb-20"
      >
        <input
          ref={titleRef}
          className="outline outline-[#2f2f2f] w-[70%] rounded-md p-2"
          type="text"
          placeholder="Search Anime"
        />

        <button
          type="submit"
          className="bg-[#ffe788] w-[45px] h-[45px] flex justify-center items-center rounded-lg"
        >
          <MaterialSymbolsSearchCheck2Outline />
        </button>
      </form>
      {error && <p className="text-red-200">検索に失敗しました。</p>}
    </div>
  );
};

export default SearchForm;
