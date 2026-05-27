"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  Mail,
  Factory,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-secondary-800 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-4">
              <a
                href="tel:+918850243463"
                className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">88502 43463</span>
              </a>
              <a
                href="tel:+918693833530"
                className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
              >
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">86938 33530</span>
              </a>
            </div>
            <a
              href="mailto:saadatindustries007@gmail.com"
              className="flex items-center gap-1.5 hover:text-accent-400 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                saadatindustries007@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white group-hover:bg-primary-800 transition-colors">
              <Factory className="h-6 w-6" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-secondary-800">
                SAADAT
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary-700">
                Industries
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-secondary-600 hover:text-primary-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+918850243463"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-700 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Get Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-secondary-600 hover:bg-gray-100 hover:text-secondary-800 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4">
            <div className="space-y-1 pt-3">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-secondary-600 hover:bg-gray-50 hover:text-primary-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 px-4">
              <a
                href="tel:+918850243463"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-800 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call: 88502 43463
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
