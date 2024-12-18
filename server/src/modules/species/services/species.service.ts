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

	findAll(take: number, skip: number): Promise<Species[]> {
		return this.speciessRepository.find({
			take,
			skip,
		});
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
