'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface MobileMenuItem {
  label: string;
  href: string;
  isDropdown?: boolean;
  subItems?: { label: string; href: string; description?: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MobileMenuItem[];
}

export default function MobileMenu({ isOpen, onClose, menuItems }: MobileMenuProps) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setOpenDropdownIndex(null); // Reset dropdowns when menu closes
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleDropdown = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-xl font-bold text-black">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6 text-neutral-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.isDropdown && item.subItems ? (
                <div className="space-y-1">
                  {/* Dropdown Trigger */}
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="w-full flex items-center justify-between px-4 py-3 text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors font-medium cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openDropdownIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  
                  {/* Dropdown Content - Accordion Style */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openDropdownIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={onClose}
                          className="block px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <div className="font-medium">{subItem.label}</div>
                          {subItem.description && (
                            <div className="text-sm text-neutral-500 mt-0.5">{subItem.description}</div>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-4 py-3 text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA Buttons */}
          <div className="pt-6 space-y-3 border-t border-neutral-200 mt-6">
            <Link
              href="/try-app"
              onClick={onClose}
              className="block w-full px-5 py-3 bg-black text-white text-center rounded-lg hover:bg-neutral-800 transition-colors font-medium"
            >
              Try App for Work
            </Link>
            <Link
              href="/signin"
              onClick={onClose}
              className="block w-full px-5 py-3 bg-neutral-900 text-white text-center rounded-lg hover:bg-neutral-800 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
