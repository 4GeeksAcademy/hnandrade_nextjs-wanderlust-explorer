import { Suspense } from "react";
import type { Metadata } from "next";
import ExperiencesExplorer from "@/components/ExperiencesExplorer";

export const metadata: Metadata = {
  title: "Experiencias | Wanderlust Explorer",
  description: "Busca y filtra experiencias por título, categoría y destino.",
};

export default function ExperiencesPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Experiencias</h1>
        <p className="mt-2 text-gray-600">Encuentra la actividad perfecta para tu próximo viaje.</p>
      </header>

      <Suspense fallback={<p className="py-12 text-center text-gray-600">Cargando experiencias...</p>}>
        <ExperiencesExplorer />
      </Suspense>
    </main>
  );
}
