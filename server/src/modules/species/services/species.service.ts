import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, type Repository } from "typeorm";
import { Species } from "../entities/species.entity";

@Injectable()
export class SpeciesService {
	constructor(
		@InjectRepository(Species)
		private speciessRepository: Repository<Species>,
	) {}

	findAll(): Promise<Species[]> {
		return this.speciessRepository.find();
	}

	findOneByID(id: number): Promise<Species | null> {
		return this.speciessRepository.findOneBy({ id });
	}

	findByName(name: string): Promise<Species[] | null> {
		return this.speciessRepository.find({
			where: { name: ILike(`%${name}%`) },
		});
	}
}
