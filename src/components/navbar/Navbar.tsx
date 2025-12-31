'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DropdownMenu from './DropdownMenu';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items configuration
  const productsItems = [
    { label: 'Link 1', href: '/products/link1', description: 'Product feature 1' },
    { label: 'Link 2', href: '/products/link2', description: 'Product feature 2' },
    { label: 'Link 3', href: '/products/link3', description: 'Product feature 3' },
    { label: 'Link 4', href: '/products/link4', description: 'Product feature 4' },
  ];

  const resourcesItems = [
    { label: 'Link 1', href: '/resources/link1', description: 'Resource 1' },
    { label: 'Link 2', href: '/resources/link2', description: 'Resource 2' },
    { label: 'Link 3', href: '/resources/link3', description: 'Resource 3' },
  ];

  const tryAppItems = [
    { label: 'Try as Solo', href: '/try/solo', description: 'Perfect for individual lawyers' },
    { label: 'Try as Small Firm', href: '/try/small-firm', description: 'Ideal for small teams' },
  ];

  // Mobile menu items
  const mobileMenuItems = [
    {
      label: 'Products',
      href: '#',
      isDropdown: true,
      subItems: productsItems,
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
    {
      label: 'Resources',
      href: '#',
      isDropdown: true,
      subItems: resourcesItems,
    },
    {
      label: 'Company',
      href: '/company',
    },
    {
      label: 'About',
      href: '/about',
    },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section - Left */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="LegalTech Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-black' : 'text-white'}`}>
                LegalTech
              </span>
            </Link>

            {/* Center Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center gap-8">
              <DropdownMenu trigger="Products" items={productsItems} isScrolled={isScrolled} />
              <Link
                href="/pricing"
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-neutral-900 hover:text-black' : 'text-white hover:text-white/80'
                }`}
              >
                Pricing
              </Link>
              <DropdownMenu trigger="Resources" items={resourcesItems} isScrolled={isScrolled} />
              <Link
                href="/company"
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-neutral-900 hover:text-black' : 'text-white hover:text-white/80'
                }`}
              >
                Company
              </Link>
              <Link
                href="/about"
                className={`font-medium transition-colors duration-300 ${
                  isScrolled ? 'text-neutral-900 hover:text-black' : 'text-white hover:text-white/80'
                }`}
              >
                About
              </Link>
            </div>

            {/* Right Section - CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <DropdownMenu trigger="Try App for Work" items={tryAppItems} isButton isScrolled={isScrolled} />
              <Link
                href="/signin"
                className="px-5 py-2.5 bg-white text-black rounded-lg hover:bg-white/90 transition-colors duration-200 font-medium"
              >
                Sign In
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'hover:bg-neutral-100' : 'hover:bg-white/10'
              }`}
              aria-label="Open menu"
            >
              <svg
                className={`w-6 h-6 transition-colors duration-300 ${isScrolled ? 'text-neutral-900' : 'text-white'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        menuItems={mobileMenuItems}
      />
    </>
  );
}
