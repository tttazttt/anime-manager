// "use client";
// import { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import Image from "next/image";
// import { Favorite } from "@/types";

// const reorder = (list: Favorite[], startIndex: number, endIndex: number) => {
//   const result = [...list]; // 配列のコピーを作成
//   const [removed] = result.splice(startIndex, 1); // 元の位置から削除
//   result.splice(endIndex, 0, removed); // 新しい位置に挿入

//   return result;
// };

// const RankingPage = () => {
//   const [ranking, setRanking] = useState<Favorite[]>([]);

//   useEffect(() => {
//     console.log("✅ RankingPage がマウントされた！", document.body);
//   }, []);

//   useEffect(() => {
//     const fetchRanking = async () => {
//       const res = await fetch("/api/anime/ranking");
//       if (!res.ok) {
//         console.error("Fetch failed with status:", res.status);
//         return;
//       }
//       const data = await res.json();
//       setRanking(data);
//     };
//     fetchRanking();
//   }, []);

//   const onDragEnd = async (result: any) => {
//     console.log("ドラッグ結果:", result);
//     if (!result.destination) {
//       console.warn("⚠ ドロップ先がない");
//       return;
//     }
//     let endIndex = result.destination.index;
//     console.log("ドロップ先インデックス:", endIndex);
//     if (
//       endIndex === null ||
//       endIndex === undefined ||
//       endIndex >= ranking.length
//     ) {
//       console.warn("⚠ destination.index が無効 → source.index を使用");
//       endIndex = result.source.index;
//     }

//     const currentRanking = [...ranking];

//     const newRanking = reorder(currentRanking, result.source.index, endIndex);
//     console.log(
//       "✅ 更新後のランキング配列:",
//       newRanking.map((a) => a.title)
//     );

//     setRanking(newRanking);
//     await fetch("/api/anime/ranking", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ rankedAnimes: newRanking }),
//     });
//   };
//   const onDragUpdate = (update: any) => {
//     if (!update.destination) {
//       console.log("🔄 ドラッグ中: destinationが無い");
//       return;
//     }
//     console.log("🚀 ドラッグ中 destination index:", update.destination.index);
//   };
//   return (
//     <div className="p-5 min-h-screen">
//       <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
//         <Droppable droppableId="ranking">
//           {(provided) => (
//             <div
//               {...provided.droppableProps}
//               ref={provided.innerRef}
//               className="space-y-3"
//             >
//               {ranking.map((anime, index) => (
//                 <Draggable
//                   key={anime.tmdbId}
//                   draggableId={anime.tmdbId.toString()}
//                   index={index}
//                 >
//                   {(provided) => (
//                     <div
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                       className="flex items-center p-3 border rounded-lg shadow-md bg-white cursor-pointer"
//                     >
//                       <span className="text-2xl font-bold w-10 text-center">
//                         {index + 1}
//                       </span>
//                       {/* 画像 */}
//                       <Image
//                         src={`https://image.tmdb.org/t/p/w200${anime.posterPath}`}
//                         alt={anime.title}
//                         width={30}
//                         height={75}
//                         className="rounded-md"
//                       />

//                       {/* タイトル */}
//                       <p className="ml-4 font-semibold">{anime.title}</p>
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default RankingPage;

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

// 🏆 並べ替え可能なアイテム (アニメ1つ分)
const SortableAnime = ({ anime }: { anime: any }) => {
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
    backgroundColor: isDragging ? "#f9d342" : "#fff", // 🟡 ドラッグ中は黄色に
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
  const [ranking, setRanking] = useState<any[]>([]);

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
        <SortableContext items={ranking} strategy={verticalListSortingStrategy}>
          {ranking.map((anime) => (
            <SortableAnime key={anime.tmdbId} anime={anime} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default RankingPage;
