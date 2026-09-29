"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, experiences } from "@/data/experiences";
import type { Category } from "@/types/experience";

interface FilterBarProps {
  category: Category | "";
  destination: string;
  onCategoryChange: (category: Category | "") => void;
  onDestinationChange: (destination: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

const DEBOUNCE_MS = 300;

const DESTINATION_OPTIONS: string[] = (() => {
  const options = new Set<string>();
  for (const { destination } of experiences) {
    options.add(destination);
    const country = destination.split(",").at(-1)?.trim();
    if (country) options.add(country);
  }
  return [...options].sort((a, b) => a.localeCompare(b));
})();

function isCategory(value: string): value is Category {
  return CATEGORIES.some((item) => item === value);
}

export default function FilterBar({
  category,
  destination,
  onCategoryChange,
  onDestinationChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  const [destinationInput, setDestinationInput] = useState(destination);
  const lastSubmittedRef = useRef(destination);

  useEffect(() => {
    if (destination === lastSubmittedRef.current) return;
    lastSubmittedRef.current = destination;
    setDestinationInput(destination);
  }, [destination]);

  useEffect(() => {
    if (destinationInput === lastSubmittedRef.current) return;
    const timeoutId = setTimeout(() => {
      lastSubmittedRef.current = destinationInput;
      onDestinationChange(destinationInput);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [destinationInput, onDestinationChange]);

  const handleClear = () => {
    lastSubmittedRef.current = "";
    setDestinationInput("");
    onClear();
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1 sm:w-48">
        <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
          Categoría
        </label>
        <select
          id="category-filter"
          value={category}
          onChange={(event) => {
            const { value } = event.target;
            onCategoryChange(isCategory(value) ? value : "");
          }}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Todas</option>
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="destination-filter" className="text-sm font-medium text-gray-700">
          Destino
        </label>
        <input
          id="destination-filter"
          type="text"
          list="destination-options"
          value={destinationInput}
          onChange={(event) => setDestinationInput(event.target.value)}
          placeholder="Ciudad o país"
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <datalist id="destination-options">
          {DESTINATION_OPTIONS.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>

      <button
        type="button"
        onClick={handleClear}
        disabled={!hasActiveFilters}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
