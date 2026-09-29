"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";

export interface FavoritesContextValue {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export default function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo(() => ({ favoriteIds, toggleFavorite }), [favoriteIds, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
