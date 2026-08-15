import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { chosunNm, eulyoo1945 } from "@/lib/fonts";
import { getSiteUrl } from "@/lib/site";
import { buildGlobalStructuredData } from "@/lib/structuredData";
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

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "법률사무소 정천",
    template: "%s",
  },
  description:
    "법률사무소 정천은 대한변호사협회 등록 형사·민사 전문 김찬협 변호사가 직접 상담하는 법률사무소입니다. 형사, 민사, 이혼·가사 등 다양한 법률 분쟁에서 의뢰인의 상황을 정확히 분석하고 최적의 해결 방안을 제시합니다. 모든 사건은 대표 변호사가 직접 검토하며, 충분한 상담과 체계적인 대응으로 의뢰인과 끝까지 함께합니다.",
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "naver-site-verification":
        "54eaeda64f2dbefb9ce2b174337ab70a2ba257db",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "법률사무소 정천",
    description:
      "법률사무소 정천은 대한변호사협회 등록 형사·민사 전문 김찬협 변호사가 직접 상담하는 법률사무소입니다. 형사, 민사, 이혼·가사 등 다양한 법률 분쟁에서 의뢰인의 상황을 정확히 분석하고 최적의 해결 방안을 제시합니다. 모든 사건은 대표 변호사가 직접 검토하며, 충분한 상담과 체계적인 대응으로 의뢰인과 끝까지 함께합니다.",
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
        <JsonLdScript
          id="global-structured-data"
          data={buildGlobalStructuredData()}
        />
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
