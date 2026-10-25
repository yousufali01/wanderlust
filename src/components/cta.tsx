import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import CtaImage from "@/app/images/CTA.png";

export function Cta() {
  return (
    <section className="relative flex min-h-[380px] items-center justify-center overflow-hidden">
      <Image
        src={CtaImage}
        alt="Aerial view of an airplane flying over a tropical island"
        fill
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div aria-hidden className="absolute inset-0 bg-black/25" />

      <div className="relative flex flex-col items-center px-6 py-24 text-center text-white">
        <h2 className="text-3xl font-light sm:text-4xl md:text-5xl xl:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-5 max-w-xl text-[15px] text-white/90">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Link
          href="/destinations"
          className="mt-10 inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-neutral-900 transition-colors hover:bg-neutral-100"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
