import { Module } from "@nestjs/common";
import { HealthModule } from "./health/health.module";
import { PrismaModule } from "./prisma/prisma.module";
import { WeddingsModule } from "./weddings/weddings.module";

@Module({
  imports: [PrismaModule, HealthModule, WeddingsModule],
})
export class AppModule {}
