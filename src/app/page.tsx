import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center overflow-hidden">
        <Image
          src="https://picsum.photos/seed/wanderlust-hero/1920/1080"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-indigo-900/90 via-indigo-700/75 to-purple-600/60" />

        <div className="mx-auto w-full max-w-7xl px-4 py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">Wanderlust Explorer</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Tu próxima aventura empieza aquí
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Descubre experiencias únicas en todo el mundo: aventura, cultura, gastronomía, bienestar y naturaleza
              en más de 20 destinos seleccionados.
            </p>
            <div className="mt-10">
              <Link
                href="/experiences"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-indigo-700 shadow-lg transition-colors hover:bg-indigo-50"
              >
                Explorar experiencias
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
