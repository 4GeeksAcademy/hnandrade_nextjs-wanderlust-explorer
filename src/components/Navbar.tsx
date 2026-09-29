"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Experiences" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { favoriteIds } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const favoritesCount = favoriteIds.length;

  const renderLinks = (mobile: boolean) =>
    NAV_LINKS.map(({ href, label }) => {
      const active = isActivePath(pathname, href);
      return (
        <li key={href}>
          <Link
            href={href}
            onClick={() => setIsMenuOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mobile ? "w-full" : ""
            } ${
              active
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {label}
            {href === "/favorites" && (
              <span
                aria-label={`${favoritesCount} favoritos`}
                className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold ${
                  active ? "bg-white text-indigo-600" : "bg-red-500 text-white"
                }`}
              >
                {favoritesCount}
              </span>
            )}
          </Link>
        </li>
      );
    });

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-indigo-600">
          Wanderlust Explorer
        </Link>

        <ul className="hidden items-center gap-1 md:flex">{renderLinks(false)}</ul>

        <button
          type="button"
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {isMenuOpen && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-gray-200 px-4 py-3 md:hidden">
          {renderLinks(true)}
        </ul>
      )}
    </header>
  );
}
