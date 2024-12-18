import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Character } from "./entities/character.entity";
import { ChickenCharacter } from "./entities/chickenCharacter.entity";
import { CharactersController } from "./controllers/characters.controller";
import { CharactersService } from "./services/characters.service";
import { ChickenCharactersService } from "./services/chickenCharacter.service";

@Module({
	imports: [TypeOrmModule.forFeature([Character, ChickenCharacter])],
	controllers: [CharactersController],
	providers: [CharactersService, ChickenCharactersService],
})
export class CharactersModule {}
