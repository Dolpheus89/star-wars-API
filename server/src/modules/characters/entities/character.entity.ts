import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	ManyToOne,
} from "typeorm";
import { ChickenCharacter } from "./chickenCharacter.entity";
import { Homeworld } from "../../homeworld/entities/homeworld.entity";
import { Species } from "../../species/entities/species.entity";

@Entity()
export class Character {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, unique: true })
	name: string;

	@Column({ length: 3 })
	heigth: string;

	@Column({ length: 4 })
	mass: string;

	@Column({ length: 10 })
	birth_year: string;

	@Column()
	gender: string;

	@Column()
	canon_status: boolean;

	@Column()
	imageUrl: string;

	@ManyToOne(
		() => Species,
		(species) => species.characters,
	)
	species: Species;

	@ManyToOne(
		() => Homeworld,
		(homeworld) => homeworld.characters,
	)
	homeworld: Homeworld;

	@OneToOne(
		() => ChickenCharacter,
		(chicken) => chicken.originalCharacter,
	)
	chickenVersion: ChickenCharacter;
}
