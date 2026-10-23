import { ArrowRight } from "lucide-react";

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
      className="relative flex min-h-[620px] flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("${HERO_IMAGE}")` }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/25"
      />

      <div className="relative flex flex-1 flex-col items-center px-6 pb-16 text-center text-white">
        <h1 className="max-w-3xl text-5xl leading-[1.1] font-light sm:text-6xl lg:text-7xl">
          Discover Your <br className="hidden sm:block" />
          Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-[15px] text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center gap-3 bg-[#17a3b3] px-9 py-4 text-sm font-semibold tracking-[0.08em] text-white uppercase hover:bg-[#128d9c]"
          >
            Explore Now
            <ArrowRight className="size-4" />
          </a>
          <a
            href="#"
            className="bg-white/30 px-9 py-4 text-sm font-semibold tracking-[0.08em] text-white uppercase backdrop-blur-sm hover:bg-white/40"
          >
            View Destination
          </a>
        </div>
      </div>

      <div className="relative flex flex-col divide-y divide-white/30 text-white sm:flex-row sm:divide-y-0 sm:divide-x">
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="flex flex-1 flex-col items-start gap-0.5 bg-neutral-500/45 px-6 py-3 text-left hover:bg-neutral-500/60"
          >
            <span className="text-lg leading-6 font-semibold">
              {field.label}
            </span>
            <span className="text-sm text-white/80">{field.value}</span>
          </button>
        ))}
        <button
          type="button"
          className="w-full bg-[#17a3b3] py-4 text-base font-semibold hover:bg-[#128d9c] sm:w-44 sm:py-0"
        >
          Search
        </button>
      </div>
    </section>
  );
}
