import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	DefaultValuePipe,
	Query,
} from "@nestjs/common";
import { Species } from "../entities/species.entity";
import { SpeciesService } from "../services/species.service";

@Controller("species")
export class SpeciesController {
	constructor(private readonly speciesService: SpeciesService) {}

	@Get()
	async findAll(
		@Query("take", new DefaultValuePipe(100), ParseIntPipe) take: number,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
	): Promise<Species[]> {
		return await this.speciesService.findAll(take, skip);
	}

	@Get(":id")
	async findByID(
		@Param("id", ParseIntPipe) id: number,
	): Promise<Species | null> {
		return await this.speciesService.findOneByID(id);
	}

	@Get("name/:name")
	async findByName(@Param("name") name: string): Promise<Species[] | null> {
		return await this.speciesService.findByName(name);
	}
}
