/*
  Warnings:

  - You are about to drop the column `backdropPath` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `homepage` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `popularity` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `voteAverage` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `voteCount` on the `Anime` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "backdropPath",
DROP COLUMN "homepage",
DROP COLUMN "overview",
DROP COLUMN "popularity",
DROP COLUMN "releaseDate",
DROP COLUMN "voteAverage",
DROP COLUMN "voteCount",
ADD COLUMN     "ranking" INTEGER;
