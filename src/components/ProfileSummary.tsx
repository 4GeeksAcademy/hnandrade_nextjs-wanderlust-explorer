"use client";

import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";

export default function ProfileSummary() {
  const { favoriteIds } = useFavorites();
  const count = favoriteIds.length;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Resumen</h2>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-4xl font-bold text-indigo-600">{count}</p>
          <p className="text-sm text-gray-600">{count === 1 ? "favorito guardado" : "favoritos guardados"}</p>
        </div>
        <Link
          href="/favorites"
          className="rounded-lg border border-indigo-600 px-4 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
        >
          Ver favoritos
        </Link>
      </div>
    </section>
  );
}
