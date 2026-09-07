import Image from "next/image";

import { homepageContent } from "@/data/homepage";

const mobileOfficeBanner = {
  heightClassName: "h-[180px]",
  objectPositionClassName: "object-[center_45%]",
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
        sizes="100vw"
        className={`object-cover ${mobileOfficeBanner.objectPositionClassName}`}
      />
    </div>
  );
}
