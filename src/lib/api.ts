/**
 * Base URL for the travel API (json-server style backend).
 * Override with NEXT_PUBLIC_API_URL when deploying.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Shape of a destination record as served by the API (MongoDB). */
export type Destination = {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
};
