"use client";
import FavoritesList from "@/components/anime/FavoritesList";
import { Favorite } from "@/types";
import { useEffect, useState } from "react";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch("/api/anime/favorite");
        const data = await res.json();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites", error);
      }
    };
    fetchFavorites();
  }, []);

  return <FavoritesList favorites={favorites} setFavorites={setFavorites} />;
};

export default FavoritesPage;
