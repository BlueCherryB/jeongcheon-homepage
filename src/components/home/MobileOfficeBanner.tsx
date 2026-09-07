import Image from "next/image";

import { homepageContent } from "@/data/homepage";

const mobileOfficeBanner = {
  imageSrc: "/hero-law-office-mobile.webp",
  heightClassName: "h-[180px]",
  imageClassName: "scale-[1.5] object-[center_45%]",
};

export function MobileOfficeBanner() {
  const { image } = homepageContent.hero;

  return (
    <div
      className={`relative overflow-hidden sm:hidden ${mobileOfficeBanner.heightClassName}`}
    >
      <Image
        src={mobileOfficeBanner.imageSrc}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 639px) 100vw, 1px"
        className={`object-cover ${mobileOfficeBanner.imageClassName}`}
      />
    </div>
  );
}
