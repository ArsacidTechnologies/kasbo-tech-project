import CandleForm from "@/components/CandleForm";
import CandleList from "@/components/CandleList";
import CandleListServer from "@/components/CandleListServer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          KASBO <span className="text-[hsl(280,100%,70%)]">TECH</span>
        </h1>
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold">Candle Form</h1>
          <CandleForm />
          <CandleList />
          <CandleListServer />
        </div>
      </div>
    </main>
  );
}
