"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimeDetails, AnimeResult } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MaterialSymbolsKidStar } from "@/components/elements/FavoriteButton";

const AnimeDetailPage = () => {
  const [anime, setAnime] = useState<AnimeDetails | null>(null);
  const params = useParams();
  const animeId = params.id as string;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch(`/api/anime/${animeId}`);
      const data = await res.json();
      setAnime(data);
    };
    if (animeId) fetchAnime();
  }, [animeId]);

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const res = await fetch("/api/anime/favorite");
        const favorites = await res.json();
        setIsFavorite(
          favorites.some((fav: AnimeResult) => fav.id === parseInt(animeId))
        );
      } catch (error) {
        console.error("Error checking favorite:", error);
      }
    };
    checkFavorite();
  }, [animeId]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await fetch("/api/anime/favorite", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tmdbId: parseInt(animeId) }),
        });
      } else {
        await fetch("/api/anime/favorite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tmdbId: anime?.id,
            title: anime?.name,
            posterPath: anime?.poster_path,
          }),
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <div className="w-full h-screen pt-10" id="container">
      <div className="w-[70%] h-[80%] mx-auto mb-10 bg-[#f0e1bf] rounded-lg p-8 shadow-lg flex gap-8">
        <div className="w-[30%]">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${anime?.poster_path}`}
            alt={anime?.name ?? ""}
            width={300}
            height={450}
          />
        </div>
        <div className="w-[70%] flex flex-col gap-5">
          <h1 className="text-3xl font-bold">{anime?.name}</h1>
          <button onClick={handleFavorite}>
            <MaterialSymbolsKidStar
              className={`text-2xl ${
                isFavorite ? "text-[#ffce1d]" : "text-[#bdbdbd]"
              }`}
            />
          </button>
          <p className="flex gap-5">
            <span className="text-6xl font-bold text-[#ffce1d]">
              {anime?.vote_average}
            </span>
            <span className="text-2xl leading-[60px]">{anime?.vote_count}</span>
            <span className="text-2xl leading-[60px]">{anime?.popularity}</span>
            <span className="text-2xl leading-[60px]">{anime?.status}</span>
          </p>
          <p className="text-2xl">{anime?.first_air_date}</p>
          <Link href={`${anime?.homepage}`} target="_blank">
            <p className="text-lg hover:opacity-40">{anime?.homepage}</p>
          </Link>
          <p className="text-sm">{anime?.overview}</p>
          <p className="text-xl"></p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetailPage;
