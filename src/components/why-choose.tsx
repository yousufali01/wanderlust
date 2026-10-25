import { Headphones, Map, ShieldCheck, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChoose() {
  return (
    <section className="bg-[#e0f4f9] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-light sm:text-4xl lg:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-4 text-center text-[15px] text-neutral-600">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-14 grid gap-7 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg sm:p-8"
            >
              <feature.icon className="size-9 text-[#17a3b3]" />
              <h3 className="mt-6 text-xl sm:text-2xl">{feature.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
