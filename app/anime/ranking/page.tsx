"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { Favorite } from "@/types";

// 🏆 並べ替え可能なアイテム (アニメ1つ分)
const SortableAnime = ({ anime }: { anime: Favorite }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: anime.tmdbId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    margin: "5px",
    // backgroundColor: isDragging ? "#f9d342" : "#fff", // 🟡 ドラッグ中は黄色に
    borderRadius: "8px",
    border: isDragging ? "2px solid #ff8c00" : "1px solid #ddd", // ✨ 境界線を変化
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    opacity: isDragging ? 0.5 : 1, // 👀 ドラッグ中は半透明に
    boxShadow: isDragging ? "0 4px 10px rgba(0, 0, 0, 0.3)" : "none", // 💡 ドラッグ時に浮き上がる
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <span className="text-xl font-bold">{anime.ranking}</span>
      <Image
        src={`https://image.tmdb.org/t/p/w200${anime.posterPath}`}
        alt={anime.title}
        width={30}
        height={75}
        className="rounded-md"
      />
      <p className="text-lg">{anime.title}</p>
    </div>
  );
};

// 🎯 ランキングページ
const RankingPage = () => {
  const [ranking, setRanking] = useState<Favorite[]>([]);

  // 📨 API からランキング取得
  useEffect(() => {
    const fetchRanking = async () => {
      const res = await fetch("/api/anime/ranking");
      if (!res.ok) {
        console.error("Failed to fetch ranking");
        return;
      }
      const data = await res.json();
      setRanking(data);
    };
    fetchRanking();
  }, []);

  // 📌 センサー (ドラッグの感度調整)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  // 🔄 並べ替え処理
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ranking.findIndex((a) => a.tmdbId === active.id);
    const newIndex = ranking.findIndex((a) => a.tmdbId === over.id);

    // 📌 並び替えた後に `ranking` を更新
    const newRanking = arrayMove(ranking, oldIndex, newIndex).map(
      (anime, index) => ({
        ...anime,
        ranking: index + 1, // 👑 ここでランキングを再計算！
      })
    );
    setRanking(newRanking);

    // 🔄 DBに並び順を保存
    await fetch("/api/anime/ranking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rankedAnimes: newRanking }),
    });
  };

  return (
    <div className="p-5 min-h-screen bg-[#fefef2]">
      <h1 className="text-2xl font-bold mb-4 text-center">Anime Ranking</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={ranking.map((anime) => anime.tmdbId)}
          strategy={verticalListSortingStrategy}
        >
          {ranking.map((anime) => (
            <SortableAnime key={anime.tmdbId} anime={anime} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default RankingPage;
