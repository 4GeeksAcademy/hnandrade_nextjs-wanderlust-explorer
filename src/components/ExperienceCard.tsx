"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";
import type { Experience } from "@/types/experience";

interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export default function ExperienceCard({ experience, isFavorite, onToggleFavorite }: ExperienceCardProps) {
  const { id, title, destination, category, price, rating, imageUrl } = experience;

  const handleFavoriteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggleFavorite(id);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          {category}
        </span>
      </div>

      <button
        type="button"
        onClick={handleFavoriteClick}
        aria-label={isFavorite ? `Quitar ${title} de favoritos` : `Añadir ${title} a favoritos`}
        aria-pressed={isFavorite}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        <svg
          className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "fill-none text-gray-700"}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-semibold text-gray-900">
          {/* Stretched link: makes the whole card clickable without nesting the button inside <a>. */}
          <Link href={`/experiences/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">{destination}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-gray-900">{price} €</span>
          <span className="flex items-center gap-1 text-sm font-medium text-amber-600" aria-label={`Valoración ${rating.toFixed(1)} de 5`}>
            <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
            </svg>
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </article>
  );
}
