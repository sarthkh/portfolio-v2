"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

const items = [
  { label: "blog", href: "/blog" },
  { label: "guestbook", href: "/guestbook" },
] as const;

export default function Header() {
  const [showV1, setShowV1] = useState(false);
  const path = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isInnerPage = path?.includes("/blog") || path?.includes("/guestbook");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowV1(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex justify-between items-center font-light mb-12 text-neutral-500 text-sm">
      <div className="relative" ref={dropdownRef}>
        {isInnerPage ? (
          <Link
            href="/"
            className="hover:text-neutral-300 transition-colors duration-200"
          >
            &larr; Back
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-neutral-300 transition-colors duration-200"
            >
              sarthkh
            </Link>
            <button
              onClick={() => setShowV1(!showV1)}
              className="px-2 py-0.5 text-xs text-neutral-400 border border-neutral-700 rounded-full hover:text-neutral-300 hover:border-neutral-500 
                       focus:outline-none focus:text-neutral-300 focus:border-neutral-500 transition-colors duration-200"
              aria-label="Toggle version switcher"
              aria-expanded={showV1}
            >
              v2
            </button>
            {showV1 && (
              <Link
                href="https://sarthakz25.vercel.app/"
                className="absolute left-0 top-full mt-2 px-3 py-1.5 text-xs bg-neutral-900 text-neutral-400 border border-neutral-700 
                         rounded-md hover:text-neutral-300 hover:border-neutral-500 flex items-center gap-2 whitespace-nowrap
                         transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowV1(false)}
              >
                View v1 site
                <ExternalLink size={12} />
              </Link>
            )}
          </div>
        )}
      </div>
      <nav>
        <ul className="flex gap-8">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:text-neutral-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
