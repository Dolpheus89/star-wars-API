import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { ChickenCharacter } from "../entities/chickenCharacter.entity";

@Injectable()
export class ChickenCharactersService {
	constructor(
		@InjectRepository(ChickenCharacter)
		private usersRepository: Repository<ChickenCharacter>,
	) {}

	findAll(): Promise<ChickenCharacter[]> {
		return this.usersRepository.find();
	}

	findOneByID(id: number): Promise<ChickenCharacter | null> {
		return this.usersRepository.findOneBy({ id });
	}
}
