import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { Homeworld } from "../entities/homeworld.entity";
import { HomeworldService } from "../services/homeworld.service";

@Controller("homeworld")
export class HomeworldController {
	constructor(private readonly homeworldService: HomeworldService) {}

	@Get()
	async findAll(): Promise<Homeworld[]> {
		return await this.homeworldService.findAll();
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
