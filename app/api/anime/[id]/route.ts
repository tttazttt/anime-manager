import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const animeId = params.id;
  if (!animeId) {
    return NextResponse.json(
      { error: "Anime ID is required" },
      { status: 400 }
    );
  }
  const apiKey = process.env.TMDB_API_KEY;
  const tmdbUrl = `https://api.themoviedb.org/3/tv/${animeId}?api_key=${apiKey}&language=ja-JP`;
  try {
    const res = await fetch(tmdbUrl);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching anime data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
