"use client";

import Link from "next/link";
import ExperienceGrid from "@/components/ExperienceGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { experiences } from "@/data/experiences";

export default function FavoritesList() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const favorites = experiences.filter((experience) => favoriteIds.includes(experience.id));

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <p className="text-lg font-medium text-gray-900">Todavía no tienes experiencias favoritas</p>
        <p className="text-gray-600">Pulsa el corazón de cualquier experiencia para guardarla aquí.</p>
        <Link
          href="/experiences"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
        >
          Explorar experiencias
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-gray-600">
        Tienes <span className="font-semibold text-gray-900">{favorites.length}</span>{" "}
        {favorites.length === 1 ? "experiencia guardada" : "experiencias guardadas"}
      </p>
      <ExperienceGrid experiences={favorites} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
