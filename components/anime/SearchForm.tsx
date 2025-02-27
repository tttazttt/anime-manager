import React, { useRef, useState } from "react";
import { MaterialSymbolsSearchCheck2Outline } from "../elements/SearchButton";
import { AnimeResult } from "@/types";

const SearchForm = ({
  onSearch,
}: {
  onSearch: (animeResults: AnimeResult[]) => void;
}) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [animeResults, setAnimeResults] = useState<AnimeResult[]>([]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = titleRef.current?.value;
    if (!query) return;
    setLoading(true);
    setError(false);

    try {
      const res = await fetch(
        `http://localhost:3000/api/anime/search?query=${query}`
      );
      const data = await res.json();
      onSearch(data.results);
    } catch (error) {
      console.error("Error fetching anime", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="flex gap-5 justify-center items-center"
      >
        <input
          ref={titleRef}
          className="outline outline-[#2f2f2f] w-[70%] rounded-md p-2"
          type="text"
          placeholder="Search Anime"
        />

        <button
          type="submit"
          className="bg-sky-200 w-[45px] h-[45px] flex justify-center items-center rounded-lg"
        >
          <MaterialSymbolsSearchCheck2Outline />
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-200">検索に失敗しました。</p>}
      {/* <AnimeList animeResults={animeResults} /> */}
    </div>
  );
};

export default SearchForm;
