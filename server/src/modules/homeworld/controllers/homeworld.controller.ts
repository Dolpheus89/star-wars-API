import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Query,
	DefaultValuePipe,
} from "@nestjs/common";
import { Homeworld } from "../entities/homeworld.entity";
import { HomeworldService } from "../services/homeworld.service";

@Controller("homeworld")
export class HomeworldController {
	constructor(private readonly homeworldService: HomeworldService) {}

	@Get()
	async findAll(
		@Query("take", new DefaultValuePipe(100), ParseIntPipe) take: number,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
	): Promise<Homeworld[]> {
		return await this.homeworldService.findAll(take, skip);
	}

	@Get(":id")
	async findByID(
		@Param("id", ParseIntPipe) id: number,
	): Promise<Homeworld | null> {
		return await this.homeworldService.findOneByID(id);
	}

	@Get("name/:name")
	async findByName(@Param("name") name: string): Promise<Homeworld[] | null> {
		return await this.homeworldService.findByName(name);
	}
}
