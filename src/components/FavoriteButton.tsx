"use client";

import HeartButton from "@/components/HeartButton";
import { useFavorites } from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  experienceId: number;
  title: string;
}

export default function FavoriteButton({ experienceId, title }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <HeartButton
      isFavorite={isFavorite(experienceId)}
      onToggle={() => toggleFavorite(experienceId)}
      label={title}
      showText
      className="border border-gray-200 px-4"
    />
  );
}
