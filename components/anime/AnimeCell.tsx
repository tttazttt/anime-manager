import { AnimeResult } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AnimeCell = ({ animeResult }: { animeResult: AnimeResult }) => {
  return (
    <Link href={`/anime/${animeResult.id}`} key={animeResult.id}>
      <div className="flex gap-8 bg-[#fffeed] p-5 rounded-xl shadow-xl hover:opacity-40 transition-opacity duration-300">
        <div className="w-[20%] lg:w-[10%]">
          <Image
            src={`https://image.tmdb.org/t/p/w500/${animeResult.poster_path}`}
            alt={animeResult.name}
            width={150}
            height={100}
          />
        </div>
        <div className="w-[80%] lg:w-[90%] flex flex-col gap-3">
          <h2 className="text-xl md:text-2xl font-bold">{animeResult.name}</h2>
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
    </Link>
  );
};

export default AnimeCell;
