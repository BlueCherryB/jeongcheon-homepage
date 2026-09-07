import Image from "next/image";

import { homepageContent } from "@/data/homepage";

const mobileOfficeBanner = {
  heightClassName: "h-[180px]",
  imageClassName: "scale-[1.32] object-[center_45%]",
};

export function MobileOfficeBanner() {
  const { image } = homepageContent.hero;

  return (
    <div
      className={`relative overflow-hidden sm:hidden ${mobileOfficeBanner.heightClassName}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        sizes="(max-width: 639px) 100vw, 1px"
        className={`object-cover ${mobileOfficeBanner.imageClassName}`}
      />
    </div>
  );
}
