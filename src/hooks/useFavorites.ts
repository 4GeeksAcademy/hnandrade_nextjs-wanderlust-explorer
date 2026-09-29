"use client";

import { useCallback, useContext } from "react";
import { FavoritesContext } from "@/components/FavoritesProvider";

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  const { favoriteIds, toggleFavorite } = context;

  const isFavorite = useCallback((id: number) => favoriteIds.includes(id), [favoriteIds]);

  return { favoriteIds, toggleFavorite, isFavorite };
}
