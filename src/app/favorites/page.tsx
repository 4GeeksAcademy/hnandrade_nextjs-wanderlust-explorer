import type { Metadata } from "next";
import FavoritesList from "@/components/FavoritesList";

export const metadata: Metadata = {
  title: "Favoritos | Wanderlust Explorer",
  description: "Tus experiencias guardadas.",
};

export default function FavoritesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Mis favoritos</h1>
        <p className="mt-2 text-gray-600">Las experiencias que has guardado para tu próximo viaje.</p>
      </header>
      <FavoritesList />
    </main>
  );
}
