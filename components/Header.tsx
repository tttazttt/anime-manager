import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between h-20 items-center px-5">
      <Link href="/">
        <h1 className="text-2xl font-bold font-['Sigmar']">Anime Manager</h1>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/anime/ranking">Ranking</Link>
        </li>
        <li>
          <Link href="/anime/favorite">favorite</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
