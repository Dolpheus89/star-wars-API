import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Species } from "./entities/species.entity";
import { SpeciesService } from "./services/species.service";
import { SpeciesController } from "./controllers/species.controller";

@Module({
	imports: [TypeOrmModule.forFeature([Species])],
	controllers: [SpeciesController],
	providers: [SpeciesService],
})
export class SpeciesModule {}
