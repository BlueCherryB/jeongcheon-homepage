import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "면책공고 | 법률사무소 정천",
  description: "법률사무소 정천 웹사이트의 법률정보 이용에 관한 안내입니다.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "면책공고 | 법률사무소 정천",
    description: "법률사무소 정천 웹사이트의 법률정보 이용에 관한 안내입니다.",
    url: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="bg-[#FAF8F4] text-[#111B36]">
      <Container className="py-20 sm:py-24 lg:py-28">
        <article className="mx-auto max-w-3xl">
          <header>
            <p className="text-sm font-semibold tracking-[0.14em] text-[#C8A96A]">
              LEGAL NOTICE
            </p>
            <h1 className="font-chosun mt-5 text-[38px] font-normal leading-tight text-[#111B36] sm:text-5xl">
              면책공고
            </h1>
            <p className="mt-6 text-base leading-8 text-[#111B36]/72 sm:text-lg">
              본 웹사이트의 법률정보 이용에 관한 안내입니다.
            </p>
          </header>

          <section className="mt-16 border-t border-[#DDD5C8] pt-9 sm:mt-20 sm:pt-11">
            <h2 className="font-chosun text-2xl font-normal text-[#111B36] sm:text-[28px]">
              면책문구
            </h2>
            <div className="mt-8 space-y-7 break-keep text-[15px] leading-8 text-[#111B36]/80 sm:text-base sm:leading-9">
              <p>
                ※ 본 웹사이트에 게시된 글과 자료는 일반적인 법률정보를 제공하기
                위한 목적으로 작성된 것으로, 구체적인 사건에 대한 법률자문이나
                법률의견을 대신하지 않습니다. 개별 사건은 사실관계, 관련 법령 및
                판례 등에 따라 결론이 달라질 수 있으므로, 게시된 내용을 구체적인
                사건에 그대로 적용해서는 안 됩니다. 법률문제에 관하여 구체적인
                판단이나 대응이 필요한 경우에는 변호사 등 법률전문가의 상담을
                받으시기 바랍니다.
              </p>
              <p>
                또한 본 웹사이트의 정보는 작성 당시의 법령과 판례 등을 기초로
                작성되었으나, 이후 법령·판례 및 제도 등의 변경에 따라 내용이
                달라질 수 있습니다. 본 웹사이트의 정보를 이용하여 취한 어떠한
                조치에 대해서도 작성자가 법적 책임을 부담하지 않음을
                알려드립니다.
              </p>
            </div>
          </section>
        </article>
      </Container>
    </main>
  );
}
