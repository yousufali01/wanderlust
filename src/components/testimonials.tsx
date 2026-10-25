"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useState } from "react";

import Person1 from "@/app/images/person1.png";
import Person2 from "@/app/images/person2.png";

type Testimonial = {
  quote: string;
  name: string;
  location: string;
  photo: StaticImageData;
};

const testimonials: Testimonial[] = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    photo: Person2,
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: Person1,
  },
  {
    quote:
      '"Tokyo Was A Dream Come True! The Food Tours And Hidden Temples Made Our Trip Truly Special. Every Moment Was Thoughtfully Curated For Us."',
    name: "Daniel Reyes",
    location: "Chicago, USA",
    photo: Person2,
  },
  {
    quote:
      '"Santorini At Sunset Took Our Breath Away. The Private Villa And Island Excursions Were Seamless From Start To Finish. We Will Be Back!"',
    name: "Emma Wilson",
    location: "London, UK",
    photo: Person1,
  },
];

export function Testimonials() {
  const [offset, setOffset] = useState(0);
  const count = testimonials.length;

  // Two cards per page on larger screens, stepping one card at a time.
  const visible = [
    testimonials[offset % count],
    testimonials[(offset + 1) % count],
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-light sm:text-4xl lg:text-5xl">
              What Travelers Say
            </h2>
            <p className="mt-3 text-[15px] text-neutral-600">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => setOffset((o) => (o - 1 + count) % count)}
              className="grid size-10 place-items-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-[#17a3b3] hover:text-[#17a3b3] sm:size-11"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => setOffset((o) => (o + 1) % count)}
              className="grid size-10 place-items-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-[#17a3b3] hover:text-[#17a3b3] sm:size-11"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2">
          {visible.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex bg-white shadow-sm ring-1 ring-neutral-200 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <blockquote className="text-base leading-snug text-neutral-900 sm:text-lg">
                  {testimonial.quote}
                </blockquote>
                <footer className="mt-auto pt-10">
                  <p className="flex items-center gap-2 font-medium text-[#17a3b3]">
                    <span
                      aria-hidden
                      className="h-px w-5 bg-[#17a3b3]"
                    />
                    {testimonial.name}
                  </p>
                  <p className="mt-1 pl-7 text-sm text-neutral-500">
                    {testimonial.location}
                  </p>
                </footer>
              </div>
              <div className="relative w-24 shrink-0 sm:w-36 lg:w-44">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 176px, (min-width: 640px) 144px, 96px"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
