"use client";

import { PackagePlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Luxury",
] as const;

const fieldLabel = "text-[13px] font-medium";

export default function AddDestinationPage() {
  const router = useRouter();
  const [category, setCategory] = useState<string>("Beach");


async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const data = Object.fromEntries(
    new FormData(event.currentTarget),
  ) as Record<string, string>;

  try {
    const res = await fetch("http://localhost:8000/add-destination", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log("New travel package:", data);
    console.log("Server response:", result);

    if (!res.ok) {
      throw new Error("Failed to add travel package");
    }
  } catch (error) {
    console.error("Error adding travel package:", error);
  }
}


  return (
    <main className="min-h-dvh bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="text-3xl font-light sm:text-4xl">
          Add New Travel Package
        </h1>

        <div className="mx-auto mt-8 max-w-2xl border border-neutral-200 bg-white p-6 shadow-lg sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="grid gap-5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-6"
            noValidate
          >
            {/* Keep the controlled select in the submitted payload. */}
            <input type="hidden" name="category" value={category} />

            <div className="sm:col-span-2">
              <Label htmlFor="destination-name" className={fieldLabel}>
                Destination Name
              </Label>
              <Input
                id="destination-name"
                name="name"
                required
                placeholder="Bali Paradise"
                className="mt-1.5 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="country" className={fieldLabel}>
                Country
              </Label>
              <Input
                id="country"
                name="country"
                required
                placeholder="Indonesia"
                className="mt-1.5 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="category" className={fieldLabel}>
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) => setCategory(value ?? "Beach")}
              >
                <SelectTrigger
                  id="category"
                  className="mt-1.5 h-8 w-full bg-white"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price" className={fieldLabel}>
                Price (USD)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                placeholder="e.g. 1299"
                className="mt-1.5 bg-white"
              />
            </div>

            <div>
              <Label htmlFor="duration" className={fieldLabel}>
                Duration
              </Label>
              <Input
                id="duration"
                name="duration"
                placeholder="e.g. 7 Days/6 Nights"
                className="mt-1.5 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="departure-date" className={fieldLabel}>
                Departure Date
              </Label>
              <Input
                id="departure-date"
                name="departureDate"
                type="date"
                className="mt-1.5 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="image-url" className={fieldLabel}>
                Image URL
              </Label>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="mt-1.5 bg-white"
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="description" className={fieldLabel}>
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the travel experience..."
                rows={5}
                className="mt-1.5 min-h-32 bg-white"
              />
            </div>

            <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => router.back()}
                className="px-5 text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <X />
                Cancel
              </Button>

              <Button
                type="submit"
                size="lg"
                className="border-transparent bg-[#17a3b3] px-5 text-white hover:bg-[#128d9c]"
              >
                <PackagePlus />
                Add Travel Package
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
