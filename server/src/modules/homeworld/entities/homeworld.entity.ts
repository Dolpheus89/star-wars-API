import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Character } from "../../characters/entities/character.entity";

@Entity()
export class Homeworld {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100, unique: true })
	name: string;

	@Column({ length: 50 })
	climat: string;

	@OneToMany(
		() => Character,
		(character) => character.homeworld,
	)
	characters?: Character[];
}
