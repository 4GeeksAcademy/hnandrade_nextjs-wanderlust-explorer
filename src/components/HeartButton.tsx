"use client";

import type { MouseEvent } from "react";

interface HeartButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  label: string;
  showText?: boolean;
  className?: string;
}

export default function HeartButton({ isFavorite, onToggle, label, showText = false, className = "" }: HeartButtonProps) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onToggle();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFavorite ? `Quitar ${label} de favoritos` : `Añadir ${label} a favoritos`}
      aria-pressed={isFavorite}
      className={`inline-flex items-center gap-2 rounded-full bg-white/90 p-2 shadow transition-colors hover:bg-white ${className}`}
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
      {showText && (
        <span className="pr-1 text-sm font-medium text-gray-800">
          {isFavorite ? "En favoritos" : "Añadir a favoritos"}
        </span>
      )}
    </button>
  );
}
