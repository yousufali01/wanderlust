import { Banner } from "@/components/banner";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#251d18]">
      <Navbar />
      <Banner />
    </main>
  );
}
