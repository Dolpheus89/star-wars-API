import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, type Repository } from "typeorm";
import { Character } from "../entities/character.entity";

@Injectable()
export class CharactersService {
	constructor(
		@InjectRepository(Character)
		private charactersRepository: Repository<Character>,
	) {}

	findAll(): Promise<Character[]> {
		return this.charactersRepository.find();
	}

	findOneByID(id: number): Promise<Character | null> {
		return this.charactersRepository.findOneBy({ id });
	}

	findByName(name: string): Promise<Character[] | null> {
		return this.charactersRepository.find({
			where: { name: ILike(`%${name}%`) },
		});
	}
}
