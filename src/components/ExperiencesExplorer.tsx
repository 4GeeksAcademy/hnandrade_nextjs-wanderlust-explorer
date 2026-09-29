"use client";

import ExperienceGrid from "@/components/ExperienceGrid";
import FilterBar from "@/components/FilterBar";
import SearchBar from "@/components/SearchBar";
import { useFavorites } from "@/hooks/useFavorites";
import { useFilters } from "@/hooks/useFilters";
import { experiences } from "@/data/experiences";

export default function ExperiencesExplorer() {
  const {
    search,
    category,
    destination,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
    filteredExperiences,
    hasActiveFilters,
  } = useFilters();
  const { favoriteIds, toggleFavorite } = useFavorites();

  const count = filteredExperiences.length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          category={category}
          destination={destination}
          onCategoryChange={setCategory}
          onDestinationChange={setDestination}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      <p className="text-sm text-gray-600" aria-live="polite">
        Mostrando <span className="font-semibold text-gray-900">{count}</span> de {experiences.length}{" "}
        {experiences.length === 1 ? "experiencia" : "experiencias"}
      </p>

      <ExperienceGrid experiences={filteredExperiences} favoriteIds={favoriteIds} onToggleFavorite={toggleFavorite} />
    </div>
  );
}
