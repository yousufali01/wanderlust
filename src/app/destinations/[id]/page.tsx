import { ArrowRight, Check, Clock, MapPin, Star } from "lucide-react";
import { notFound } from "next/navigation";

import { DestinationActions } from "@/components/destination-actions";
import { DestinationError } from "@/components/destination-error";
import { DestinationImage } from "@/components/destination-image";
import { API_BASE, type Destination } from "@/lib/api";
import { galleryImageFor } from "@/lib/destination-images";

const fallbackDescription =
  "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.";

const highlights = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
  "Traditional Balinese cooking class",
];

const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

// The API does not track ratings yet — placeholder matching the design.
const rating = { value: "4.9", reviews: 234 };

function formatPrice(price: string) {
  const amount = Number(price);
  return Number.isFinite(amount) ? `$${amount.toLocaleString("en-US")}` : price;
}

function formatDuration(duration: string) {
  const days = Number(duration);
  if (!Number.isFinite(days) || days < 1) return duration;
  return `${days} Days / ${days - 1} Nights`;
}

function formatDate(departureDate: string) {
  const [year, month, day] = departureDate.split("-");
  if (!year || !month || !day) return departureDate;
  return `${month}/${day}/${year}`;
}

const demoDestinationsMap: Record<string, Destination> = {
  "demo-1": {
    _id: "demo-1",
    name: "Bali Paradise",
    country: "Indonesia",
    category: "Beach",
    price: "2700",
    duration: "7",
    departureDate: "2026-11-20",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description: "Discover the magic of Bali with pristine beaches, ancient temples, and vibrant culture. Experience luxury resorts, tropical landscapes, and unforgettable sunsets.",
  },
  "demo-2": {
    _id: "demo-2",
    name: "Maldives Escape",
    country: "Maldives",
    category: "Beach",
    price: "3400",
    duration: "6",
    departureDate: "2026-12-05",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
    description: "Experience the crystal clear waters, private overwater bungalows, and world-class marine life in the breathtaking tropical haven of the Maldives.",
  },
  "demo-3": {
    _id: "demo-3",
    name: "Swiss Alps Adventure",
    country: "Switzerland",
    category: "Mountain",
    price: "3200",
    duration: "8",
    departureDate: "2027-01-15",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description: "Witness majestic mountain peaks, serene alpine lakes, and world-class ski trails nestled in the picturesque villages of Switzerland.",
  },
  "demo-4": {
    _id: "demo-4",
    name: "Santorini Sunset",
    country: "Greece",
    category: "Cultural",
    price: "2400",
    duration: "5",
    departureDate: "2026-11-30",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
    description: "Immerse yourself in whitewashed cliffside villas, azure Aegean waters, and world-famous panoramic sunsets across the caldera of Santorini.",
  },
  "demo-5": {
    _id: "demo-5",
    name: "Kyoto Trails",
    country: "Japan",
    category: "Cultural",
    price: "1900",
    duration: "9",
    departureDate: "2026-12-10",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
    description: "Wander through centuries-old Shinto shrines, peaceful bamboo groves, and historic tea houses in Japan's timeless cultural heartland.",
  },
  "demo-6": {
    _id: "demo-6",
    name: "Queenstown Thrill",
    country: "New Zealand",
    category: "Adventure",
    price: "2100",
    duration: "7",
    departureDate: "2027-02-01",
    imageUrl: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad",
    description: "Unleash your inner adventurer with bungee jumping, jet boating, and hiking amidst the awe-inspiring Southern Alps and Lake Wakatipu.",
  },
};

export default async function DestinationDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let destination: Destination | undefined;

  try {
    const response = await fetch(`${API_BASE}/destination/${id}`);
    if (response.ok) {
      const parsed = (await response.json()) as Partial<Destination> | null;
      if (parsed && typeof parsed === "object") {
        destination = {
          _id: parsed._id ?? id,
          name: parsed.name ?? "",
          country: parsed.country ?? "",
          category: parsed.category ?? "Other",
          price: parsed.price ?? "",
          duration: parsed.duration ?? "",
          departureDate: parsed.departureDate ?? "",
          imageUrl: parsed.imageUrl ?? "",
          description: parsed.description ?? "",
        };
      }
    } else if (response.status === 404 && !demoDestinationsMap[id]) {
      notFound();
    }
  } catch {
    // API is offline or request threw
  }

  // Fallback to demo destination if available
  if (!destination && demoDestinationsMap[id]) {
    destination = demoDestinationsMap[id];
  }

  if (!destination) {
    return (
      <main className="min-h-dvh bg-white">
        <DestinationError id={id} />
      </main>
    );
  }

  const description =
    destination.description?.trim() || fallbackDescription;

  return (
    <main className="min-h-dvh bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DestinationActions destination={destination} />

        <div className="relative mt-5 aspect-[16/9] w-full overflow-hidden bg-neutral-100 sm:aspect-[2/1]">
          <DestinationImage
            src={destination.imageUrl}
            fallbackSrc={galleryImageFor(destination._id)}
            alt={destination.name}
            priority
          />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px] lg:gap-10">
          <div>
            <p className="flex items-center gap-1.5 text-[15px] text-neutral-600">
              <MapPin className="size-4" />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-light sm:text-5xl">
              {destination.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-neutral-700">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-emerald-500 text-emerald-500" />
                <span className="font-medium">{rating.value}</span>
                <span className="text-neutral-500">
                  ({rating.reviews} reviews)
                </span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-neutral-500" />
                {formatDuration(destination.duration)}
              </span>
            </div>

            <h2 className="mt-10 text-2xl font-normal">Overview</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-600">
              {description}
            </p>

            <h2 className="mt-10 text-2xl font-normal">Highlights</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-neutral-600">
              Key experiences and activities included in this journey:
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-x-8">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-[15px] text-neutral-700"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit border border-neutral-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-sm text-neutral-500">Starting from</p>
            <p className="mt-1 text-3xl font-semibold text-[#17a3b3]">
              {formatPrice(destination.price)}
            </p>
            <p className="text-sm text-neutral-500">per person</p>

            <hr className="my-5 border-neutral-200" />

            <p className="text-[15px] text-neutral-800">
              {destination.departureDate
                ? `Departure: ${formatDate(destination.departureDate)}`
                : "Flexible departure dates"}
            </p>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 bg-[#17a3b3] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#128d9c]"
            >
              Book Now
              <ArrowRight className="size-4" />
            </button>

            <ul className="mt-6 space-y-3 border-t border-neutral-200 pt-5 text-sm text-neutral-600">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {perk}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  );
}
