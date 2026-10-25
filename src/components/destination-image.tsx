"use client";

import Image from "next/image";
import { useState } from "react";

import FallbackImage from "@/app/images/Banner.png";

/**
 * Destination image with a resolution chain:
 * 1. the API-provided URL (`src`) when it is a real http(s) resource
 * 2. `fallbackSrc` (a curated gallery photo) when `src` is missing or broken
 * 3. a bundled photo when nothing remote loads (e.g. offline)
 */
export function DestinationImage({
  src,
  alt,
  fallbackSrc,
  priority = false,
  sizes = "100vw",
}: {
  src?: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [stage, setStage] = useState(0);

  const candidates = [
    ...new Set(
      [src, fallbackSrc].filter(
        (value): value is string =>
          typeof value === "string" && /^https?:\/\//i.test(value),
      ),
    ),
  ];
  const current = candidates[stage];

  if (current) {
    return (
      <Image
        key={stage}
        src={current}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        onError={() => setStage((s) => s + 1)}
      />
    );
  }

  return (
    <Image
      src={FallbackImage}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      placeholder="blur"
      className="object-cover transition-transform duration-300 group-hover:scale-105"
    />
  );
}
