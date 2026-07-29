import { Injectable, NotFoundException } from "@nestjs/common";
import type { Wedding } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.module";
import type { WeddingResponse } from "./wedding.types";

type WeddingWithProgram = Wedding & {
  programItems: Array<{
    time: string;
    title: string;
    description: string | null;
    sortOrder: number;
  }>;
};

@Injectable()
export class WeddingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getBySlug(slug: string): Promise<WeddingResponse> {
    const wedding = await this.prisma.wedding.findUnique({
      where: { slug },
      include: {
        programItems: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!wedding) {
      throw new NotFoundException(`Wedding "${slug}" not found`);
    }

    return this.toResponse(wedding);
  }

  private toResponse(wedding: WeddingWithProgram): WeddingResponse {
    return {
      slug: wedding.slug,
      couple: {
        bride: wedding.brideName,
        groom: wedding.groomName,
        displayName: wedding.displayName,
      },
      date: {
        iso: wedding.weddingDate.toISOString().slice(0, 10),
        display: wedding.dateDisplay,
      },
      venue: {
        city: wedding.venueCity,
        name: wedding.venueName,
        address: wedding.venueAddress,
      },
      invitation: {
        greeting: wedding.invitationGreeting,
        message: wedding.invitationMessage,
      },
      program: wedding.programItems.map((item) => ({
        time: item.time,
        title: item.title,
        ...(item.description ? { description: item.description } : {}),
      })),
    };
  }
}
