import { Destinations, type DestinationCard } from "@/components/destinations";
import { API_BASE } from "@/lib/api";
import { galleryImageAt } from "@/lib/destination-images";

// Always read the catalog at request time so new/updated destinations
// appear immediately (and the demo fallback kicks in if the API is down).
export const dynamic = "force-dynamic";

type ApiDestination = {
  _id: string;
  name?: string;
  country?: string;
  category?: string;
  price?: string;
  duration?: string;
  departureDate?: string;
  imageUrl?: string;
  description?: string;
};

/** Shown when the API is unreachable, so the page never renders empty. */
const demoDestinations: DestinationCard[] = [
  {
    id: "demo-1",
    title: "Bali Paradise",
    location: "Indonesia",
    category: "Beach",
    price: 2700,
    rating: 4.5,
    duration: "7 Days/6 Nights",
  },
  {
    id: "demo-2",
    title: "Maldives Escape",
    location: "Maldives",
    category: "Beach",
    price: 3400,
    rating: 4.8,
    duration: "6 Days/5 Nights",
  },
  {
    id: "demo-3",
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    category: "Mountain",
    price: 3200,
    rating: 4.6,
    duration: "8 Days/7 Nights",
  },
  {
    id: "demo-4",
    title: "Santorini Sunset",
    location: "Greece",
    category: "Cultural",
    price: 2400,
    rating: 4.7,
    duration: "5 Days/4 Nights",
  },
  {
    id: "demo-5",
    title: "Kyoto Trails",
    location: "Japan",
    category: "Cultural",
    price: 1900,
    rating: 4.5,
    duration: "9 Days/8 Nights",
  },
  {
    id: "demo-6",
    title: "Queenstown Thrill",
    location: "New Zealand",
    category: "Adventure",
    price: 2100,
    rating: 4.9,
    duration: "7 Days/6 Nights",
  },
];

function formatDuration(duration?: string) {
  const days = Number(duration);
  if (!Number.isFinite(days) || days < 1) return duration || "Flexible";
  return `${days} Days/${days - 1} Nights`;
}

function toCard(destination: ApiDestination, index: number): DestinationCard {
  const price = Number(destination.price);
  return {
    id: destination._id,
    title: destination.name?.trim() || "Untitled Destination",
    location: destination.country?.trim() || "Location to be announced",
    category: destination.category?.trim() || "Other",
    price: Number.isFinite(price) ? price : 0,
    departureDate: destination.departureDate,
    description: destination.description,
    // The API does not track ratings yet — placeholder matching the design.
    rating: 4.5,
    duration: formatDuration(destination.duration),
    imageUrl:
      destination.imageUrl && /^https?:\/\//i.test(destination.imageUrl)
        ? destination.imageUrl
        : undefined,
    // Every card gets its own distinct photo behind the API image.
    galleryUrl: galleryImageAt(index),
  };
}

async function loadDestinations(): Promise<DestinationCard[]> {
  try {
    const res = await fetch(`${API_BASE}/destinations`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
    return (data as ApiDestination[]).map((destination, index) =>
      toCard(destination, index),
    );
  } catch {
    // API offline or unexpected payload — fall back to demo data.
    return demoDestinations.map((destination, index) => ({
      ...destination,
      galleryUrl: galleryImageAt(index),
    }));
  }
}

export default async function DestinationsPage() {
  const items = await loadDestinations();

  return (
    <main className="min-h-dvh bg-white">
      <Destinations items={items} />
    </main>
  );
}
