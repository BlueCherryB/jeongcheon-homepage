import localFont from "next/font/local";

export const chosunNm = localFont({
  src: "../fonts/ChosunNm.ttf",
  variable: "--font-chosun-nm",
  display: "swap",
  weight: "400",
  style: "normal",
});

export const eulyoo1945 = localFont({
  // This face is only used for the two-character "정천" wordmark.
  // Keeping a glyph subset here lets the root-layout preload finish before the header paints.
  src: "../fonts/Eulyoo1945-Logo.ttf",
  variable: "--font-eulyoo1945",
  display: "swap",
  preload: true,
  fallback: ["Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
  weight: "400",
  style: "normal",
});
