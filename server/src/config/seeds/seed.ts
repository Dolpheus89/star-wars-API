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

	// Species
	console.log("Starting species seeding...");
	for (const species of speciesData.species) {
		const existingSpecies = await speciesRepo
			.createQueryBuilder("species")
			.where("LOWER(species.name) = LOWER(:name)", { name: species.name })
			.getOne();

		if (!existingSpecies) {
			await speciesRepo.save(species);
			console.log(`Created species: ${species.name}`);
		}
	}

	// Homeworlds
	console.log("Starting homeworlds seeding...");
	for (const homeworld of homeworldsData.homeworlds) {
		const existingHomeworld = await homeworldRepo
			.createQueryBuilder("homeworld")
			.where("LOWER(homeworld.name) = LOWER(:name)", { name: homeworld.name })
			.getOne();

		if (!existingHomeworld) {
			await homeworldRepo.save(homeworld);
			console.log(`Created homeworld: ${homeworld.name}`);
		}
	}

	// Characters
	console.log("Starting characters seeding...");
	for (const charData of charactersData.characters) {
		const existingCharacter = await characterRepo
			.createQueryBuilder("character")
			.where("LOWER(character.name) = LOWER(:name)", { name: charData.name })
			.getOne();

		if (!existingCharacter) {
			const species = await speciesRepo
				.createQueryBuilder("species")
				.where("LOWER(species.name) = LOWER(:name)", {
					name: charData.speciesName,
				})
				.getOne();

			const homeworld = await homeworldRepo
				.createQueryBuilder("homeworld")
				.where("LOWER(homeworld.name) = LOWER(:name)", {
					name:
						charData.homeworldName === "unknown"
							? null
							: charData.homeworldName,
				})
				.getOne();

			if (!species) {
				console.log(
					`Species not found for ${charData.name}: ${charData.speciesName}`,
				);
				continue;
			}

			if (!homeworld && charData.homeworldName !== "unknown") {
				console.log(
					`Homeworld not found for ${charData.name}: ${charData.homeworldName}`,
				);
				continue;
			}

			const { speciesName, homeworldName, ...characterData } = charData;

			try {
				const newCharacter = characterRepo.create({
					...characterData,
					species: species,
					homeworld: homeworld || null,
				});

				await characterRepo.save(newCharacter);
				console.log(`Created character: ${charData.name}`);
			} catch (error) {
				console.error(`Error creating ${charData.name}:`, error);
			}
		}
	}
};
