"use client";

import { ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EditDestinationDialog } from "@/components/EditDestinationDialog";
import { useToast } from "@/hooks/use-toast";
import { API_BASE, type Destination } from "@/lib/api";

export function DestinationActions({
  destination,
}: {
  destination: Destination;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${destination.name}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    setIsDeleting(true);

    if (destination._id.startsWith("demo-")) {
      toast({
        title: "Destination deleted",
        description: `${destination.name} was removed.`,
        type: "success",
      });
      router.push("/destinations");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/destination/${destination._id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      toast({
        title: "Destination deleted",
        description: `${destination.name} was removed from the database.`,
        type: "success",
      });

      router.push("/destinations");
      router.refresh();
    } catch {
      toast({
        title: "Delete failed",
        description: "Could not delete this destination. Please try again.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Link
        href="/destinations"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 transition-colors hover:text-[#17a3b3]"
      >
        <ArrowLeft className="size-4" />
        Back to Destinations
      </Link>

      <div className="flex items-center gap-3">
        <EditDestinationDialog destination={destination} />
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="inline-flex h-9 items-center gap-2 border border-red-300 bg-white px-4 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 className="size-4" />
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
