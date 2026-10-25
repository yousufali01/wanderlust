"use client";

import { Clock, ExternalLink, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import BannerImage from "@/app/images/Banner.png";
import CtaImage from "@/app/images/CTA.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Destination = {
  id: number;
  title: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  duration: string;
  image: typeof BannerImage;
};

const destinations: Destination[] = [
  {
    id: 1,
    title: "Bali Paradise",
    location: "Indonesia",
    category: "Beach",
    price: 2700,
    rating: 4.5,
    duration: "7 Days/6 Nights",
    image: BannerImage,
  },
  {
    id: 2,
    title: "Maldives Escape",
    location: "Maldives",
    category: "Beach",
    price: 3400,
    rating: 4.8,
    duration: "6 Days/5 Nights",
    image: CtaImage,
  },
  {
    id: 3,
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    category: "Mountain",
    price: 3200,
    rating: 4.6,
    duration: "8 Days/7 Nights",
    image: BannerImage,
  },
  {
    id: 4,
    title: "Santorini Sunset",
    location: "Greece",
    category: "Cultural",
    price: 2400,
    rating: 4.7,
    duration: "5 Days/4 Nights",
    image: CtaImage,
  },
  {
    id: 5,
    title: "Kyoto Trails",
    location: "Japan",
    category: "Cultural",
    price: 1900,
    rating: 4.5,
    duration: "9 Days/8 Nights",
    image: BannerImage,
  },
  {
    id: 6,
    title: "Queenstown Thrill",
    location: "New Zealand",
    category: "Adventure",
    price: 2100,
    rating: 4.9,
    duration: "7 Days/6 Nights",
    image: CtaImage,
  },
];

const categories = ["all", "Beach", "Mountain", "Cultural", "Adventure"] as const;
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

export function Destinations() {
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const filtered = destinations
    .filter(
      (destination) => category === "all" || destination.category === category,
    )
    .filter((destination) =>
      matchesPriceRange(destination.price, priceRange),
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return a.id - b.id;
    });

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
                        ? "$2,000 – $3,000"
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
            {filtered.map((destination) => (
              <article
                key={destination.id}
                className="group flex flex-col overflow-hidden bg-white ring-1 ring-neutral-200 transition-shadow duration-200 hover:shadow-lg"
              >
                <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white px-2.5 py-1.5 text-[13px] font-medium text-neutral-900 shadow-sm">
                    {destination.rating.toFixed(1)}
                    <Star className="size-3.5 fill-neutral-900 text-neutral-900" />
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 text-[13px] text-neutral-500">
                    <MapPin className="size-4" />
                    {destination.location}
                  </p>

                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium sm:text-xl">
                      {destination.title}
                    </h3>
                    <p className="whitespace-nowrap text-lg font-semibold text-neutral-900">
                      ${destination.price}
                      <span className="text-xs font-normal text-neutral-500">
                        /Person
                      </span>
                    </p>
                  </div>

                  <p className="mt-2 flex items-center gap-1.5 text-[13px] text-neutral-500">
                    <Clock className="size-4" />
                    {destination.duration}
                  </p>

                  <a
                    href="#"
                    className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[13px] font-semibold tracking-[0.06em] text-[#17a3b3] uppercase transition-colors hover:text-[#128d9c]"
                  >
                    Book Now
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
