import { Favorite } from "@/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MaterialSymbolsKidStar } from "../elements/FavoriteButton";
import Link from "next/link";

const FavoriteCell = ({
  favorite,
  setFavorites,
  favorites,
}: {
  favorite: Favorite;
  setFavorites: Dispatch<SetStateAction<Favorite[]>>;
  favorites: Favorite[];
}) => {
  const [isFavorite, setIsFavorite] = useState(true);
  const { tmdbId, title, posterPath, ranking } = favorite;

  const handleFavorite = async () => {
    if (isFavorite) {
      await fetch("/api/anime/favorite/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tmdbId }),
      });
      setIsFavorite(false);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((f) => f.tmdbId !== favorite.tmdbId)
      );
    }
  };
  useEffect(() => {
    console.log("Updated favorites:", favorites);
  }, [favorites]);
  return (
    <div className="flex gap-4 shadow-md p-4 rounded-md">
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          width={50}
          height={100}
        />
      </div>
      <div>
        <Link href={`/anime/${tmdbId}`}>
          <h2 className="text-2xl font-bold hover:opacity-70">{title}</h2>
        </Link>
        <p className="text-sm text-gray-500">Rank:{ranking}</p>
        <button onClick={handleFavorite}>
          <MaterialSymbolsKidStar
            className={`text-2xl ${
              isFavorite ? "text-[#ffce1d]" : "text-[#bdbdbd]"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default FavoriteCell;
