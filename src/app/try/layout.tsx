import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Legal Tech",
    description:
        "Secure and easy-to-use legal management system for law firms and lawyers",
    icons: {
        icon: [{ url: "/logo.png", type: "image/png" }],
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
};

export default function TryLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-white flex">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-black text-white flex-col justify-between p-12">
                <div>
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Legal Tech Logo"
                            width={40}
                            height={40}
                            className="brightness-0 invert"
                        />
                        <span className="text-2xl font-bold">Legal Tech</span>
                    </Link>
                </div>

                <div className="space-y-8">
                    <h1 className="text-5xl font-bold leading-tight">
                        Start your journey with Legal Tech
                    </h1>
                    <p className="text-xl text-neutral-300">
                        Join thousands of legal professionals who trust our
                        platform to streamline their workflow and enhance
                        productivity.
                    </p>

                    <div className="space-y-4 pt-8">
                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Advanced Analytics
                                </h3>
                                <p className="text-neutral-400">
                                    Track and analyze your legal cases with
                                    powerful insights
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-black"
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
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Enterprise Security
                                </h3>
                                <p className="text-neutral-400">
                                    Bank-level encryption to keep your data safe
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-6 h-6 text-black"
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
                            <div>
                                <h3 className="text-lg font-semibold">
                                    Lightning Fast
                                </h3>
                                <p className="text-neutral-400">
                                    Optimized performance for seamless
                                    experience
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-sm text-neutral-400">
                    © 2025 Legal Tech. All rights reserved.
                </div>
            </div>

            {children}
        </div>
    );
}
