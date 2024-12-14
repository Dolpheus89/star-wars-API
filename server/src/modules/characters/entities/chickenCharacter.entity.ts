import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { Character } from "./character.entity";

@Entity()
export class ChickenCharacter {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ length: 100 })
	name: string;

	@Column({ default: "30" })
	height: string;

	@Column({ default: "2" })
	mass: string;

	@Column({ length: 10 })
	birth_year: string;

	@Column()
	gender: string;

	@Column()
	canon_status: boolean;

	@Column()
	imageUrl: string;

	@Column({ default: "Gallus gallus domesticus" })
	species: string;

	@Column({ enum: ["KFC", "L214"] })
	homeworld: "KFC" | "L214";

	@Column()
	originalCharacterId: number;

	@OneToOne(
		() => Character,
		(character) => character.chickenVersion,
		{ nullable: true },
	)
	@JoinColumn({ name: "originalCharacterId" })
	originalCharacter: Character;
}
