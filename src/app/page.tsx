import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-1 flex-col bg-white text-zinc-950">
        <section className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="text-sm font-medium text-zinc-600">
            Jeongcheon Law Office
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight">
            의뢰인의 상황을 정확히 이해하고 차분하게 해결 방향을 찾습니다.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            정천 법률사무소는 형사, 민사, 기업 법무 등 주요 법률 문제에 대해
            신뢰할 수 있는 상담과 대응을 준비하는 법률 플랫폼입니다.
          </p>
        </section>

        <section id="attorney" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">변호사 소개</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              사건의 사실관계와 법적 쟁점을 면밀히 검토하고, 의뢰인이 이해할 수
              있는 언어로 절차와 선택지를 설명합니다.
            </p>
          </div>
        </section>

        <section id="practice" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">업무 분야</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              형사 사건, 민사 분쟁, 기업 자문, 계약 검토 등 주요 법률 영역별
              안내를 체계적으로 제공할 예정입니다.
            </p>
          </div>
        </section>

        <section id="cases" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">사례</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              실제 사건의 쟁점과 해결 과정을 개인정보와 비밀유지 원칙을 지켜
              이해하기 쉬운 방식으로 정리할 예정입니다.
            </p>
          </div>
        </section>

        <section id="articles" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">법률 글</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              자주 발생하는 법률 문제와 절차를 객관적이고 정확한 설명 중심으로
              정리하여 검색과 AI 이해에 적합한 콘텐츠를 구축합니다.
            </p>
          </div>
        </section>

        <section id="faq" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">자주 묻는 질문</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              상담 전 준비사항, 사건 진행 절차, 비용 안내 등 의뢰인이 자주
              궁금해하는 내용을 명확하게 정리할 예정입니다.
            </p>
          </div>
        </section>

        <section id="contact" className="border-t border-zinc-200">
          <div className="mx-auto w-full max-w-6xl px-6 py-16">
            <h2 className="text-2xl font-semibold">상담 안내</h2>
            <p className="mt-4 max-w-3xl leading-7 text-zinc-700">
              방문 상담, 전화 상담, 온라인 문의 등 상담 경로와 준비해야 할 자료를
              안내하는 영역입니다.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
