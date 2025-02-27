import React from "react";
import { AnimeResult } from "@/types";
import AnimeCell from "./AnimeCell";

const AnimeList = ({ animeResults }: { animeResults: AnimeResult[] }) => {
  return (
    <div className="flex flex-col gap-10 my-10 w-[70%] mx-auto">
      {(animeResults || []).map((animeResult) => (
        <AnimeCell animeResult={animeResult} key={animeResult.id} />
      ))}
    </div>
  );
};

export default AnimeList;
