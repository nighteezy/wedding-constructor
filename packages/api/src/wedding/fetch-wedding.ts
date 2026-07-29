import type { Wedding } from "@wedding/entity-wedding";
import { API_BASE_URL } from "../config";
import type { WeddingApiResponse } from "./types";

export async function fetchWedding(slug: string): Promise<Wedding> {
  const response = await fetch(`${API_BASE_URL}/api/weddings/${slug}`);

  if (!response.ok) {
    throw new Error(`Не удалось загрузить данные свадьбы (${response.status})`);
  }

  const data = (await response.json()) as WeddingApiResponse;

  return {
    couple: data.couple,
    date: data.date,
    venue: data.venue,
    invitation: data.invitation,
    program: data.program,
  };
}
