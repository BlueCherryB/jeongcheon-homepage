type MobileCaseSectionNumberProps = {
  number: number;
};

export function MobileCaseSectionNumber({ number }: MobileCaseSectionNumberProps) {
  return (
    <>
      <span aria-hidden="true" className="shrink-0 text-base font-semibold text-[#C8A96A] lg:hidden">
        {String(number).padStart(2, "0")}
      </span>
      <span aria-hidden="true" className="h-5 w-px shrink-0 bg-[#D9C89E] lg:hidden" />
    </>
  );
}
