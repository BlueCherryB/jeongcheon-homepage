type MobileCaseSectionNumberProps = {
  number: number;
  showOnDesktop?: boolean;
};

export function MobileCaseSectionNumber({ number, showOnDesktop = false }: MobileCaseSectionNumberProps) {
  return (
    <>
      <span aria-hidden="true" className={showOnDesktop
        ? "shrink-0 text-[20px] font-medium leading-[1.35] text-[#C8A96A] lg:text-[22px]"
        : "shrink-0 text-base font-semibold text-[#C8A96A] lg:hidden"}>
        {String(number).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className={showOnDesktop
        ? "mt-1 h-5 w-px shrink-0 bg-[#D9C89E] lg:h-6"
        : "h-5 w-px shrink-0 bg-[#D9C89E] lg:hidden"} />
    </>
  );
}
