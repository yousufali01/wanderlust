import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Placeholder asset — swap for the real hero image when available.
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=80";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
] as const;

export function Banner() {
  return (
    <section
      className="relative flex min-h-[560px] flex-col bg-cover bg-center bg-no-repeat sm:min-h-[640px]"
      style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80"
      />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 text-center text-white">
        <h1 className="max-w-4xl text-4xl font-light tracking-tight sm:text-6xl lg:text-7xl leading-[1.15]">
          {" "}
          <span className="block sm:inline font-normal">
            Discover Your Next Adventure
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base sm:text-lg text-white/90 leading-relaxed font-light">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex w-full max-w-sm flex-col items-stretch gap-4 sm:mx-auto sm:w-auto sm:max-w-none sm:flex-row">
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center gap-2.5 rounded bg-[#17a3b3] px-9 py-4 text-sm font-semibold tracking-wider text-white uppercase shadow-lg shadow-[#17a3b3]/30 transition-all hover:bg-[#128d9c] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/destinations"
            className="inline-flex items-center justify-center rounded border border-white/40 bg-white/10 px-9 py-4 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/70 hover:-translate-y-0.5 active:translate-y-0"
          >
            View Destinations
          </Link>
        </div>
      </div>

      <div className="relative flex flex-col divide-y divide-white/20 bg-black/40 backdrop-blur-md text-white border-t border-white/15 sm:flex-row sm:divide-y-0 sm:divide-x">
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="flex flex-1 flex-col items-start gap-1 px-6 py-3.5 text-left transition-colors hover:bg-white/10"
          >
            <span className="text-xs uppercase tracking-wider text-[#2dd4bf] font-medium">
              {field.label}
            </span>
            <span className="text-sm sm:text-base font-semibold text-white/90">
              {field.value}
            </span>
          </button>
        ))}
        <Link
          href="/destinations"
          className="flex items-center justify-center bg-[#17a3b3] px-8 py-4 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#128d9c] sm:w-44 sm:py-0"
        >
          Search
        </Link>
      </div>
    </section>
  );
}
