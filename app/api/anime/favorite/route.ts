import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { tmdbId, title, posterPath } = await request.json();

    const favorite = await prisma.anime.create({
      data: {
        tmdbId,
        title,
        posterPath,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "お気に入りの追加に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { tmdbId } = await request.json();

    await prisma.anime.delete({
      where: { tmdbId },
    });

    return NextResponse.json({ message: "お気に入りを削除しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "お気に入りの削除に失敗しました" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const favorites = await prisma.anime.findMany();

    return NextResponse.json(favorites);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "お気に入りの取得に失敗しました" },
      { status: 500 }
    );
  }
}
