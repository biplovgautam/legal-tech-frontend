'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownMenuProps {
  trigger: string;
  items: DropdownItem[];
  isButton?: boolean;
  isScrolled?: boolean;
}

export default function DropdownMenu({ trigger, items, isButton = false, isScrolled = false }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 transition-all duration-300 cursor-pointer ${
          isButton
            ? 'px-5 py-2.5 bg-black text-white rounded-lg hover:bg-neutral-800 font-medium'
            : isScrolled
            ? 'text-neutral-900 hover:text-black font-medium'
            : 'text-white hover:text-white/80 font-medium'
        }`}
      >
        {trigger}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 overflow-hidden transition-all duration-200 origin-top ${
          isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 hover:bg-neutral-50 transition-colors duration-150"
            >
              <div className="font-medium text-neutral-900">{item.label}</div>
              {item.description && (
                <div className="text-sm text-neutral-500 mt-0.5">{item.description}</div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
