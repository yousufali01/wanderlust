"use client";

import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { API_BASE, type Destination } from "@/lib/api";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
  "Luxury",
] as const;

const fieldLabel = "text-[13px] font-medium";
const fieldClass = "mt-1.5 bg-white h-9";

/**
 * Edit destination form inside a shadcn Dialog. Can be controlled via
 * `open`/`onOpenChange` props (used from the listing page) or self-managed
 * (used from the detail page). Saving performs `PUT /destination/:id` so the
 * change is written through to MongoDB.
 */
export function EditDestinationDialog({
  destination,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: {
  destination: Destination;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : isOpen;

  const [name, setName] = useState(destination.name);
  const [country, setCountry] = useState(destination.country);
  const [category, setCategory] = useState(destination.category);
  const [price, setPrice] = useState(destination.price);
  const [duration, setDuration] = useState(destination.duration);
  const [departureDate, setDepartureDate] = useState(
    destination.departureDate,
  );
  const [imageUrl, setImageUrl] = useState(destination.imageUrl);
  const [description, setDescription] = useState(destination.description);

  // Always offer the standard categories plus whatever the record already has.
  const categoryOptions = Array.from(
    new Set([...categories, destination.category]),
  );

  function resetForm() {
    setName(destination.name);
    setCountry(destination.country);
    setCategory(destination.category);
    setPrice(destination.price);
    setDuration(destination.duration);
    setDepartureDate(destination.departureDate);
    setImageUrl(destination.imageUrl);
    setDescription(destination.description);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!isControlled) setIsOpen(nextOpen);
    onOpenChangeProp?.(nextOpen);
    if (nextOpen) {
      resetForm();
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const payload: Destination = {
      _id: destination._id,
      name: name.trim(),
      country: country.trim(),
      category,
      price: price.trim(),
      duration: duration.trim(),
      departureDate,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    };

    if (destination._id.startsWith("demo-")) {
      toast({
        title: "Destination updated",
        description: `${payload.name} was saved successfully.`,
        type: "success",
      });

      if (!isControlled) setIsOpen(false);
      onOpenChangeProp?.(false);
      router.refresh();
      setSaving(false);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/destination/${destination._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Update failed (${res.status})`);

      toast({
        title: "Destination updated",
        description: `${payload.name} was saved successfully.`,
        type: "success",
      });

      if (!isControlled) setIsOpen(false);
      onOpenChangeProp?.(false);
      // Re-run the server component so the fresh MongoDB data renders.
      router.refresh();
    } catch {
      toast({
        title: "Update failed",
        description: "Could not save your changes. Please try again.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
          >
            <Pencil className="size-4" />
            Edit
          </button>
        }
      />

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details below. Changes are saved to the database
            immediately.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid max-h-[70vh] gap-4 overflow-y-auto pr-1 sm:grid-cols-2"
        >
          <div className="sm:col-span-2">
            <Label htmlFor="edit-name" className={fieldLabel}>
              Destination Name
            </Label>
            <Input
              id="edit-name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <Label htmlFor="edit-country" className={fieldLabel}>
              Country
            </Label>
            <Input
              id="edit-country"
              name="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <Label htmlFor="edit-category" className={fieldLabel}>
              Category
            </Label>
            <Select value={category} onValueChange={(v) => setCategory(v ?? category)}>
              <SelectTrigger id="edit-category" className={`${fieldClass} w-full`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-price" className={fieldLabel}>
              Price (USD)
            </Label>
            <Input
              id="edit-price"
              name="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <Label htmlFor="edit-duration" className={fieldLabel}>
              Duration (days)
            </Label>
            <Input
              id="edit-duration"
              name="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <Label htmlFor="edit-departure" className={fieldLabel}>
              Departure Date
            </Label>
            <Input
              id="edit-departure"
              name="departureDate"
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div>
            <Label htmlFor="edit-image" className={fieldLabel}>
              Image URL
            </Label>
            <Input
              id="edit-image"
              name="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className={fieldClass}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="edit-description" className={fieldLabel}>
              Description
            </Label>
            <Textarea
              id="edit-description"
              name="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 min-h-24 bg-white"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:col-span-2 sm:flex-row sm:justify-end">
            <DialogClose
              render={
                <button
                  type="button"
                  className="border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                />
              }
            >
              Cancel
            </DialogClose>
            <button
              type="submit"
              disabled={saving}
              className="bg-[#17a3b3] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#128d9c] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
