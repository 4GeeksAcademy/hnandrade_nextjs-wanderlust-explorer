"use client";

import ExperienceCard from "@/components/ExperienceCard";
import type { Experience } from "@/types/experience";

interface ExperienceGridProps {
  experiences: Experience[];
  favoriteIds: number[];
  onToggleFavorite: (id: number) => void;
}

export default function ExperienceGrid({ experiences, favoriteIds, onToggleFavorite }: ExperienceGridProps) {
  if (experiences.length === 0) {
    return <p className="py-12 text-center text-gray-600">No se encontraron resultados</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {experiences.map((experience) => (
        <ExperienceCard
          key={experience.id}
          experience={experience}
          isFavorite={favoriteIds.includes(experience.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
