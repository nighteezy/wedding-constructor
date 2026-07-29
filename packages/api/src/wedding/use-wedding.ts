import { useQuery } from "@tanstack/react-query";
import { WEDDING_SLUG } from "../config";
import { fetchWedding } from "./fetch-wedding";

export function useWedding(slug: string = WEDDING_SLUG) {
  return useQuery({
    queryKey: ["wedding", slug],
    queryFn: () => fetchWedding(slug),
  });
}
