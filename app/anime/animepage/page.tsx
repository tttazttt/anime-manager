"use client";
import AnimeList from "@/components/anime/AnimeList";
import SearchForm from "@/components/anime/SearchForm";
import { AnimeResult } from "@/types";
import React, { useState } from "react";

const AnimePage = () => {
  const [animeResults, setAnimeResults] = useState<AnimeResult[]>([]);
  return (
    <div>
      <SearchForm onSearch={setAnimeResults} />
      <AnimeList animeResults={animeResults} />
    </div>
  );
};

export default AnimePage;
