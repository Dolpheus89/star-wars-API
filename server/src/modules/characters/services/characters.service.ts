import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import type { Repository } from "typeorm";
import { Character } from "../entities/character.entity";

@Injectable()
export class CharactersService {
	constructor(
		@InjectRepository(Character)
		private usersRepository: Repository<Character>,
	) {}

	findAll(): Promise<Character[]> {
		return this.usersRepository.find();
	}

	findOneByID(id: number): Promise<Character | null> {
		return this.usersRepository.findOneBy({ id });
	}
}
