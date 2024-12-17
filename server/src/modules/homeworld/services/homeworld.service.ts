import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, type Repository } from "typeorm";
import { Homeworld } from "../entities/homeworld.entity";

@Injectable()
export class HomeworldService {
	constructor(
		@InjectRepository(Homeworld)
		private homeworldsRepository: Repository<Homeworld>,
	) {}

	findAll(): Promise<Homeworld[]> {
		return this.homeworldsRepository.find();
	}

	findOneByID(id: number): Promise<Homeworld | null> {
		return this.homeworldsRepository.findOneBy({ id });
	}

	findByName(name: string): Promise<Homeworld[] | null> {
		return this.homeworldsRepository.find({
			where: { name: ILike(`%${name}%`) },
		});
	}
}
