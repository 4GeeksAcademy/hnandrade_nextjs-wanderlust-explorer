import Link from "next/link";

export default function ExperienceNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-6xl" aria-hidden="true">🧭</p>
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">Experiencia no encontrada</h1>
      <p className="text-gray-600">
        Parece que esta experiencia no existe o ya no está disponible. ¡Hay muchas más esperándote!
      </p>
      <Link
        href="/experiences"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-700"
      >
        Volver a experiencias
      </Link>
    </main>
  );
}
