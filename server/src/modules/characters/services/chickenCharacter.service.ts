import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, type Repository } from "typeorm";
import { ChickenCharacter } from "../entities/chickenCharacter.entity";

@Injectable()
export class ChickenCharactersService {
	constructor(
		@InjectRepository(ChickenCharacter)
		private chickenCharactersRepository: Repository<ChickenCharacter>,
	) {}

	findAll(): Promise<ChickenCharacter[]> {
		return this.chickenCharactersRepository.find();
	}

	findOneByID(id: number): Promise<ChickenCharacter | null> {
		return this.chickenCharactersRepository.findOneBy({ id });
	}

	findByName(name: string): Promise<ChickenCharacter[] | null> {
		return this.chickenCharactersRepository.find({
			where: { name: ILike(`%${name}%`) },
		});
	}
}