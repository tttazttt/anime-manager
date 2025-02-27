import { AnimeResult, Favorite } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MaterialSymbolsKidStar } from "../elements/FavoriteButton";

const AnimeCell = ({ animeResult }: { animeResult: AnimeResult }) => {
  const tmdbId = animeResult.id;
  const title = animeResult.name;
  const posterPath = animeResult.poster_path;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch(`/api/anime/favorite`);
        const favorites = await res.json();
        setIsFavorite(favorites.some((fav: Favorite) => fav.tmdbId === tmdbId));
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };
    checkFavorite();
  }, [tmdbId]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch("/api/anime/favorite", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId }),
        });
      } else {
        await fetch("/api/anime/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tmdbId,
            title,
            posterPath,
          }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <div
      key={animeResult.id}
      className="flex gap-8 bg-[#fffeed] p-5 rounded-xl shadow-xl"
    >
      <div className="w-[20%] lg:w-[10%]">
        <Image
          src={`https://image.tmdb.org/t/p/w500/${animeResult.poster_path}`}
          alt={animeResult.name}
          width={150}
          height={100}
        />
      </div>
      <div className="w-[80%] lg:w-[90%] flex flex-col gap-3">
        <Link href={`/anime/${animeResult.id}`}>
          <h2 className="text-xl md:text-2xl font-bold hover:opacity-40 transition-opacity duration-300">
            {animeResult.name}
          </h2>
        </Link>
        <button onClick={handleFavorite}>
          <MaterialSymbolsKidStar
            className={`text-2xl ${
              isFavorite ? "text-[#ffce1d]" : "text-[#bdbdbd]"
            }`}
          />
        </button>
        <p className="flex gap-2 ">
          <span className="font-bold text-4xl text-[#ffce1d]">
            {animeResult.vote_average}
          </span>
          <span className="text-sm leading-[40px]">
            評価数:{animeResult.vote_count}
          </span>
        </p>
        <p>{animeResult.first_air_date}</p>
      </div>
    </div>
  );
};

export default AnimeCell;
