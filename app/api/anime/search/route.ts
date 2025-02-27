import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  const apiKey = process.env.TMDB_API_KEY;
  const tmdbUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}&with_genres=16&language=ja-JP`;
  try {
    const res = await fetch(tmdbUrl);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching anime", error);
  }
}
