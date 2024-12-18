import {
	Controller,
	Get,
	Param,
	Query,
	ParseIntPipe,
	DefaultValuePipe,
} from "@nestjs/common";
import { Character } from "../entities/character.entity";
import { ChickenCharacter } from "../entities/chickenCharacter.entity";
import { CharactersService } from "../services/characters.service";
import { ChickenCharactersService } from "../services/chickenCharacter.service";

@Controller("characters")
export class CharactersController {
	constructor(
		private readonly charactersService: CharactersService,
		private readonly chickenCharactersService: ChickenCharactersService,
	) {}

	@Get("original")
	async findAllCanon(
		@Query("take", new DefaultValuePipe(100), ParseIntPipe) take: number,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
	): Promise<Character[]> {
		return await this.charactersService.findAll(take, skip);
	}

	@Get("original/:id")
	async findCanonByID(
		@Param("id", ParseIntPipe) id: number,
	): Promise<Character | null> {
		return await this.charactersService.findOneByID(id);
	}

	@Get("chickens")
	async findAllChickens(
		@Query("take", new DefaultValuePipe(100), ParseIntPipe) take: number,
		@Query("skip", new DefaultValuePipe(0), ParseIntPipe) skip: number,
	): Promise<ChickenCharacter[]> {
		return await this.chickenCharactersService.findAll(take, skip);
	}

	@Get("chickens/:id")
	async findChickenByID(
		@Param("id", ParseIntPipe) id: number,
	): Promise<ChickenCharacter | null> {
		return await this.chickenCharactersService.findOneByID(id);
	}

	@Get("name/:name")
	async findByName(
		@Param("name") name: string,
		@Query("chicken") chicken?: boolean,
	): Promise<Character[] | ChickenCharacter[] | null> {
		if (chicken === true) {
			return await this.chickenCharactersService.findByName(name);
		}
		return await this.charactersService.findByName(name);
	}
}
