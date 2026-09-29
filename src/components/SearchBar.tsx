"use client";

import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DEBOUNCE_MS = 300;

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar experiencias por título...",
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  // Last value sent to the URL, so its echo back through `value` doesn't overwrite newer typing.
  const lastSubmittedRef = useRef(value);

  useEffect(() => {
    if (value === lastSubmittedRef.current) return;
    lastSubmittedRef.current = value;
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (inputValue === lastSubmittedRef.current) return;
    const timeoutId = setTimeout(() => {
      lastSubmittedRef.current = inputValue;
      onChange(inputValue);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timeoutId);
  }, [inputValue, onChange]);

  return (
    <div className="relative w-full">
      <label htmlFor="experience-search" className="sr-only">
        Buscar experiencias
      </label>
      <input
        id="experience-search"
        type="search"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      />
    </div>
  );
}
