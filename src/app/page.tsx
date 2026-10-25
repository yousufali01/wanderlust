import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";
import { Navbar } from "@/components/navbar";
import { Testimonials } from "@/components/testimonials";
import { WhyChoose } from "@/components/why-choose";

export default function Home() {
  return (
    <main className="min-h-dvh bg-[#251d18]">
      <Navbar />
      <Banner />
      <WhyChoose />
      <Cta />
      <Testimonials />
    </main>
  );
}
