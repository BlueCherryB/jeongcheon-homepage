import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { chosunNm, eulyoo1945 } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const isProduction = process.env.NODE_ENV === "production";

// TEMP GA DEBUG: remove after verifying Cloudflare environment injection.
console.log("[ga-debug]", {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  gaMeasurementId,
  isProduction,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "법률사무소 정천",
    template: "%s",
  },
  description: "정천 법률사무소 공식 홈페이지입니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "법률사무소 정천",
    description: "정천 법률사무소 공식 홈페이지입니다.",
    url: "/",
    siteName: "법률사무소 정천",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${chosunNm.variable} ${eulyoo1945.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* TEMP GA DEBUG: remove this block after verifying Cloudflare environment injection. */}
        <div
          id="ga-debug"
          className="fixed left-2 top-2 z-[9999] max-w-[calc(100vw-1rem)] rounded border border-red-500 bg-white p-3 text-xs text-red-700 shadow-lg"
        >
          <p>NODE_ENV: {process.env.NODE_ENV ?? "undefined"}</p>
          <p>isProduction: {String(isProduction)}</p>
          <p>GA_ID: {gaMeasurementId ?? "undefined"}</p>
        </div>
        <Header />
        {children}
        <Footer />
      </body>
      {isProduction && gaMeasurementId ? (
        <GoogleAnalytics gaId={gaMeasurementId} />
      ) : null}
    </html>
  );
}
