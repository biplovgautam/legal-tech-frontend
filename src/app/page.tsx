"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Home() {
    const [isTryDropdownOpen, setIsTryDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsTryDropdownOpen(false);
            }
        }

        if (isTryDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isTryDropdownOpen]);

    return (
        <div className="relative min-h-screen font-sans overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />

                {/* Hero Section */}
                <div className="flex min-h-screen items-center justify-center md:justify-end px-4 sm:px-6 py-20 md:py-20">
                    <div className="max-w-4xl w-full text-center md:text-right md:pr-12 lg:pr-20 xl:pr-32">
                        {/* Main Heading */}
                        <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white drop-shadow-2xl leading-tight">
                            Legal Management System
                        </h1>
                        <h2 className="mb-6 sm:mb-8 text-xl sm:text-2xl md:text-3xl font-semibold text-white/95 drop-shadow-lg">
                            for Law Firms & Lawyers
                        </h2>

                        {/* Description */}
                        <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl leading-relaxed text-white/90 drop-shadow-md max-w-2xl mx-auto md:ml-auto">
                            The most secure and reliable platform designed
                            specifically for legal professionals. Streamline
                            your practice, manage cases efficiently, and keep
                            your data protected with our intuitive legal
                            management system.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center md:justify-end gap-3 sm:gap-4">
                            {/* Try Dropdown */}
                            <div
                                className="relative w-full sm:w-auto"
                                ref={dropdownRef}
                            >
                                <button
                                    onClick={() =>
                                        setIsTryDropdownOpen(!isTryDropdownOpen)
                                    }
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black rounded-lg hover:bg-neutral-100 transition-all duration-200 font-semibold text-base sm:text-lg shadow-xl cursor-pointer"
                                >
                                    Try for Free
                                    <svg
                                        className={`w-5 h-5 transition-transform duration-200 ${
                                            isTryDropdownOpen
                                                ? "rotate-180"
                                                : ""
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

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute top-full left-0 right-0 sm:left-0 sm:right-auto mt-2 w-full sm:w-64 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden transition-all duration-200 origin-top z-50 ${
                                        isTryDropdownOpen
                                            ? "opacity-100 scale-100 visible"
                                            : "opacity-0 scale-95 invisible"
                                    }`}
                                >
                                    <div className="py-2">
                                        <Link
                                            href="/demo"
                                            className="block px-6 py-4 hover:bg-neutral-50 transition-colors duration-150"
                                            onClick={() =>
                                                setIsTryDropdownOpen(false)
                                            }
                                        >
                                            <div className="font-semibold text-neutral-900">
                                                Try as Demo
                                            </div>
                                            <div className="text-sm text-neutral-500 mt-1">
                                                Perfect for showing off
                                            </div>
                                        </Link>
                                        <Link
                                            href="/demo"
                                            className="block px-6 py-4 hover:bg-neutral-50 transition-colors duration-150"
                                            onClick={() =>
                                                setIsTryDropdownOpen(false)
                                            }
                                        >
                                            <div className="font-semibold text-neutral-900">
                                                Try as Test
                                            </div>
                                            <div className="text-sm text-neutral-500 mt-1">
                                                Perfect for testing off
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Sign In Button */}
                            <Link
                                href="/signin"
                                className="w-full sm:w-auto text-center px-6 sm:px-8 py-3 sm:py-4 bg-black text-white rounded-lg hover:bg-neutral-800 transition-all duration-200 font-semibold text-base sm:text-lg shadow-xl"
                            >
                                Sign In
                            </Link>
                        </div>

                        {/* Features Highlights */}
                        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-black">
                                    Bank-Level Security
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Your data is protected with enterprise-grade
                                    encryption
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-black">
                                    Easy to Use
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Intuitive interface designed for legal
                                    professionals
                                </p>
                            </div>
                            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-xl sm:col-span-2 md:col-span-1">
                                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-semibold text-lg mb-2 text-black">
                                    Complete Solution
                                </h3>
                                <p className="text-sm text-neutral-600">
                                    Manage cases, documents, and clients in one
                                    place
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New Section - Why Legal Professionals Trust Us */}
                <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-10 sm:mb-12 md:mb-16">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-3 sm:mb-4">
                                Why Legal Professionals Trust LegalTech
                            </h2>
                            <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto px-4">
                                Built specifically for the legal industry with
                                features that matter most to attorneys and law
                                firms
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {/* Feature 1 */}
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl mb-2 text-black">
                                    Compliance Ready
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 px-2">
                                    Meet all legal industry compliance
                                    requirements including attorney-client
                                    privilege protection
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl mb-2 text-black">
                                    Document Security
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 px-2">
                                    End-to-end encryption ensures sensitive
                                    legal documents remain confidential
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl mb-2 text-black">
                                    Time Tracking
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 px-2">
                                    Accurate billable hours tracking with
                                    automated time entries and reporting
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                                    <svg
                                        className="w-7 h-7 sm:w-8 sm:h-8 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl mb-2 text-black">
                                    Client Portal
                                </h3>
                                <p className="text-sm sm:text-base text-neutral-600 px-2">
                                    Secure client communication and document
                                    sharing through dedicated portals
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="bg-black text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                    10K+
                                </div>
                                <div className="text-sm sm:text-base text-neutral-400">
                                    Legal Professionals
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                    500+
                                </div>
                                <div className="text-sm sm:text-base text-neutral-400">
                                    Law Firms
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                    99.9%
                                </div>
                                <div className="text-sm sm:text-base text-neutral-400">
                                    Uptime SLA
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                                    24/7
                                </div>
                                <div className="text-sm sm:text-base text-neutral-400">
                                    Support Available
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
}
