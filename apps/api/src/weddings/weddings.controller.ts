import { Controller, Get, Param } from "@nestjs/common";
import type { WeddingResponse } from "./wedding.types";
import { WeddingsService } from "./weddings.service";

@Controller("weddings")
export class WeddingsController {
  constructor(private readonly weddingsService: WeddingsService) {}

  @Get(":slug")
  getWedding(@Param("slug") slug: string): Promise<WeddingResponse> {
    return this.weddingsService.getBySlug(slug);
  }
}
