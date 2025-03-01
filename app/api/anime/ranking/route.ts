import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let ranking = await prisma.anime.findMany({
      orderBy: { ranking: "asc" },
    });
    const maxRanking = ranking.reduce(
      (max, anime) => (anime.ranking ? Math.max(max, anime.ranking) : max),
      0
    );
    let newRank = maxRanking + 1;
    ranking = ranking.map((anime) => ({
      ...anime,
      ranking: anime.ranking ?? newRank++,
    }));
    return NextResponse.json(ranking);
  } catch (error) {
    console.error("Error fetching ranking data:", error);
    return NextResponse.json(
      { error: "Failed to fetch ranking data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { rankedAnimes } = await request.json();

    for (let i = 0; i < rankedAnimes.length; i++) {
      await prisma.anime.update({
        where: { tmdbId: rankedAnimes[i].tmdbId },
        data: { ranking: i + 1 },
      });
    }
    return NextResponse.json({ message: "Ranking updated successfully" });
  } catch (error) {
    console.error("Error updating ranking:", error);
    return NextResponse.json(
      { error: "Failed to update ranking" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const { rankedAnimes } = await request.json(); // フロントから送られたランキングデータ

  try {
    // ランキング順にDBを更新
    for (let i = 0; i < rankedAnimes.length; i++) {
      await prisma.anime.update({
        where: { tmdbId: rankedAnimes[i].tmdbId },
        data: { ranking: i + 1 }, // 1から順番を振り直す
      });
    }

    return new Response(
      JSON.stringify({ message: "Ranking updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating ranking:", error);
    return new Response(JSON.stringify({ error: "Failed to update ranking" }), {
      status: 500,
    });
  }
}
