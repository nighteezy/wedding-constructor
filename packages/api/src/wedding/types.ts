import type { Wedding } from "@wedding/entity-wedding";

export type WeddingApiResponse = Wedding & {
  slug: string;
};
