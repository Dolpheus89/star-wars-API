import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Character } from "../../characters/entities/character.entity";

@Entity()
export class Species {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, unique: true })
	name: string;

	@Column({ length: 50 })
	classification: string;

	@Column({ length: 50 })
	average_lifespan: string;

	@OneToMany(
		() => Character,
		(character) => character.species,
	)
	characters?: Character[];
}
