"use client";

import { Clock, ExternalLink, MapPin, Pencil, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DestinationImage } from "@/components/destination-image";
import { EditDestinationDialog } from "@/components/EditDestinationDialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { API_BASE } from "@/lib/api";

export type DestinationCard = {
  id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  duration: string;
  departureDate?: string;
  description?: string;
  /** Remote image URL from the API (when it is usable). */
  imageUrl?: string;
  /** Curated photo used when the API image is missing or fails to load. */
  galleryUrl?: string;
};

const priceRanges = ["all", "under-2000", "2000-3000", "over-3000"] as const;
const sortOptions = ["featured", "price-asc", "price-desc", "rating"] as const;

const filterTriggerClass =
  "h-11 w-full justify-between bg-white px-4 text-[13px] uppercase tracking-[0.06em] text-neutral-600";

function matchesPriceRange(price: number, range: string) {
  if (range === "under-2000") return price < 2000;
  if (range === "2000-3000") return price >= 2000 && price <= 3000;
  if (range === "over-3000") return price > 3000;
  return true;
}

export function Destinations({ items }: { items: DestinationCard[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [openEditId, setOpenEditId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const categories = [
    "all",
    ...Array.from(new Set(items.map((item) => item.category))).sort(),
  ];

  const filtered = items
    .filter(
      (item) => category === "all" || item.category === category,
    )
    .filter((item) => matchesPriceRange(item.price, priceRange))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this destination? This cannot be undone.",
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/destination/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      toast({
        title: "Destination deleted",
        description: "The destination was removed from the database.",
        type: "success",
      });

      router.refresh();
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not delete this destination. Please try again.",
        type: "error",
      });
    } finally {
      setDeletingId(null);
    }
  }

  const openItem = openEditId ? items.find((i) => i.id === openEditId) : null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-light sm:text-4xl lg:text-5xl">
          Explore All Destinations
        </h2>
        <p className="mt-3 text-[15px] text-neutral-600">
          Find your perfect travel experience from our curated collection
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
          <Select value={category} onValueChange={(v) => setCategory(v ?? "all")}>
            <SelectTrigger className={filterTriggerClass} aria-label="Category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === "all" ? "All Categories" : value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={priceRange}
            onValueChange={(v) => setPriceRange(v ?? "all")}
          >
            <SelectTrigger className={filterTriggerClass} aria-label="Price range">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === "all"
                    ? "All Prices"
                    : value === "under-2000"
                      ? "Under $2,000"
                      : value === "2000-3000"
                        ? "$2,000 - $3,000"
                        : "Over $3,000"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSort(v ?? "featured")}>
            <SelectTrigger className={filterTriggerClass} aria-label="Sort by">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((value) => (
                <SelectItem key={value} value={value}>
                  {value === "featured"
                    ? "Featured"
                    : value === "price-asc"
                      ? "Price: Low to High"
                      : value === "price-desc"
                        ? "Price: High to Low"
                        : "Top Rated"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="mt-5 text-[13px] text-neutral-500">
          Showing {filtered.length} destination
          {filtered.length === 1 ? "" : "s"}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-8 border border-dashed border-neutral-300 bg-neutral-50 p-12 text-center text-neutral-500">
            No destinations match your filters.
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article
                key={item.id}
                className="group relative flex h-full flex-col overflow-hidden bg-white ring-1 ring-neutral-200 transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                  <Link
                    href={`/destinations/${item.id}`}
                    className="block h-full w-full focus-visible:ring-2 focus-visible:ring-[#17a3b3] focus-visible:outline-none"
                  >
                    <DestinationImage
                      src={item.imageUrl}
                      fallbackSrc={item.galleryUrl}
                      alt={item.title}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </Link>

                  <div className="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-900 shadow-sm">
                    {item.rating.toFixed(1)}
                    <Star className="size-3.5 fill-neutral-900 text-neutral-900" />
                  </div>

                  {/* Card action overlay: Edit / Delete */}
                  <div className="absolute bottom-3 right-3 z-10 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => setOpenEditId(item.id)}
                      className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-neutral-900 shadow-sm transition-colors hover:bg-[#17a3b3] hover:text-white"
                      disabled={deletingId === item.id}
                    >
                      <Pencil className="mr-1 size-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center rounded-md border border-neutral-200 bg-white px-2.5 py-1.5 text-[12px] font-medium text-red-600 shadow-sm transition-colors hover:bg-red-600 hover:text-white"
                      disabled={deletingId === item.id}
                      aria-label="Delete destination"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>

                <Link
                  href={`/destinations/${item.id}`}
                  className="flex flex-1 flex-col p-4 focus-visible:ring-2 focus-visible:ring-[#17a3b3] focus-visible:outline-none sm:p-5"
                >
                  <p className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                    <MapPin className="size-4" />
                    {item.location}
                  </p>

                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium text-neutral-900 transition-colors group-hover:text-[#17a3b3] sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="whitespace-nowrap text-lg font-semibold text-neutral-900">
                      ${item.price.toLocaleString("en-US")}
                      <span className="text-xs font-normal text-neutral-500">
                        /Person
                      </span>
                    </p>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-[13px] text-neutral-500">
                    <Clock className="size-4" />
                    {item.duration}
                  </p>

                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold tracking-[0.06em] text-[#17a3b3] uppercase transition-colors group-hover:text-[#128d9c]">
                    Book Now
                    <ExternalLink className="size-3.5" />
                  </span>
                </Link>

                {openEditId === item.id && openItem && (
                  <EditDestinationDialog
                    destination={{
                      _id: openItem.id,
                      name: openItem.title,
                      country: openItem.location,
                      category: openItem.category,
                      price: String(openItem.price),
                      duration: openItem.duration,
                      departureDate: openItem.departureDate ?? "",
                      imageUrl: openItem.imageUrl ?? "",
                      description: openItem.description ?? "",
                    }}
                    open={true}
                    onOpenChange={(nextOpen) => {
                      if (!nextOpen) setOpenEditId(null);
                    }}
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
