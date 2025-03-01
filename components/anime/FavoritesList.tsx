import { Favorite } from "@/types";
import React, { Dispatch, SetStateAction } from "react";
import FavoriteCell from "./FavoriteCell";

const FavoritesList = ({
  favorites,
  setFavorites,
}: {
  favorites: Favorite[];
  setFavorites: Dispatch<SetStateAction<Favorite[]>>;
}) => {
  return (
    <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {favorites.map((favorite) => (
        <FavoriteCell
          key={favorite.id}
          favorite={favorite}
          setFavorites={setFavorites}
          favorites={favorites}
        />
      ))}
    </div>
  );
};

export default FavoritesList;
