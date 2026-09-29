"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, experiences } from "@/data/experiences";
import type { Category, Experience } from "@/types/experience";

type FilterKey = "search" | "category" | "destination";

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildTitleMatcher(term: string): RegExp {
  try {
    return new RegExp(term, "i");
  } catch {
    return new RegExp(escapeRegExp(term), "i");
  }
}

function isCategory(value: string): value is Category {
  return CATEGORIES.some((item) => item === value);
}

export function useFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") ?? "";
  const rawCategory = searchParams.get("category") ?? "";
  const category: Category | "" = isCategory(rawCategory) ? rawCategory : "";
  const destination = searchParams.get("destination") ?? "";

  const updateParam = useCallback(
    (key: FilterKey, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      const trimmed = value.trim();
      if (trimmed) {
        params.set(key, trimmed);
      } else {
        params.delete(key);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, pathname, router],
  );

  const setSearch = useCallback((value: string) => updateParam("search", value), [updateParam]);
  const setCategory = useCallback(
    (value: Category | "") => updateParam("category", value),
    [updateParam],
  );
  const setDestination = useCallback(
    (value: string) => updateParam("destination", value),
    [updateParam],
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("category");
    params.delete("destination");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [searchParams, pathname, router]);

  const filteredExperiences = useMemo<Experience[]>(() => {
    const titleMatcher = search ? buildTitleMatcher(search) : null;
    const destinationTerm = destination.toLowerCase();

    return experiences.filter((experience) => {
      if (titleMatcher && !titleMatcher.test(experience.title)) return false;
      if (category && experience.category !== category) return false;
      if (destinationTerm && !experience.destination.toLowerCase().includes(destinationTerm)) {
        return false;
      }
      return true;
    });
  }, [search, category, destination]);

  const hasActiveFilters = Boolean(search || category || destination);

  return {
    search,
    category,
    destination,
    setSearch,
    setCategory,
    setDestination,
    clearFilters,
    filteredExperiences,
    hasActiveFilters,
  };
}
