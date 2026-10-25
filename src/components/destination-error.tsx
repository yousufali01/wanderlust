"use client";

import Link from "next/link";

export function DestinationError({ id }: { id: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-light">Destination unavailable</h1>
      <p className="mt-4 text-[15px] text-neutral-600">
        We could not load this destination. Make sure the API server is
        running, then try again.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/destinations"
          className="border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
        >
          Back to Destinations
        </Link>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-[#17a3b3] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#128d9c]"
        >
          Retry
        </button>
      </div>
      <p className="mt-6 text-xs text-neutral-400">Requested ID: {id}</p>
    </div>
  );
}
