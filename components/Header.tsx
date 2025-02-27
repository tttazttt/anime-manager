import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="container mx-auto flex justify-between h-20 items-center">
      <Link href="/anime">
        <h1 className="text-2xl font-bold font-['Sigmar']">Anime Manager</h1>
      </Link>
      <ul className="flex gap-4">
        <li>
          <Link href="/anime">Home</Link>
        </li>
        <li>
          <Link href="/anime">Ranking</Link>
        </li>
        <li>
          <Link href="/anime">favorite</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
