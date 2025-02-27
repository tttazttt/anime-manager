"use client";
import AnimeList from "@/components/anime/AnimeList";
import { AnimeResult } from "@/types";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AnimeListPage = () => {
  const searchParams = useSearchParams();
  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const query = searchParams?.get("query") ?? "";
  console.log(query);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(false);
          const res = await fetch(
            `/api/anime/search?query=${encodeURIComponent(query)}`
          );
          const data = await res.json();
          setAnimeResults(data.results || []);
          console.log(data.results);
        } catch (error) {
          console.error("Error fetching anime", error);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [query]);

  return (
    <div>
      {error && <div>検索に失敗しました。</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <AnimeList animeResults={animeResults} />
      )}
    </div>
  );
};

export default AnimeListPage;
