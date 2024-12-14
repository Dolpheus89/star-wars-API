import type { DataSource } from "typeorm";
import { Species } from "../../modules/species/entities/species.entity";
import { Homeworld } from "../../modules/homeworld/entities/homeworld.entity";
import { Character } from "../../modules/characters/entities/character.entity";
import speciesData from "./data/species.json";
import homeworldsData from "./data/homeworlds.json";
import charactersData from "./data/characters.json";

export const seedDatabase = async (dataSource: DataSource) => {
	const speciesRepo = dataSource.getRepository(Species);
	const homeworldRepo = dataSource.getRepository(Homeworld);
	const characterRepo = dataSource.getRepository(Character);

	for (const species of speciesData.species) {
		const existing = await speciesRepo.findOne({
			where: { name: species.name },
		});
		if (!existing) {
			await speciesRepo.save(species);
		}
	}

	for (const homeworld of homeworldsData.homeworlds) {
		const existing = await homeworldRepo.findOne({
			where: { name: homeworld.name },
		});
		if (!existing) {
			await homeworldRepo.save(homeworld);
		}
	}

	for (const charData of charactersData.characters) {
		const existing = await characterRepo.findOne({
			where: { name: charData.name },
		});
		if (!existing) {
			const species = await speciesRepo.findOne({
				where: { name: charData.speciesName },
			});
			const homeworld = await homeworldRepo.findOne({
				where: { name: charData.homeworldName },
			});

			const character = characterRepo.create({
				...charData,
				species,
				homeworld,
			});
			await characterRepo.save(character);
		}
	}
};
