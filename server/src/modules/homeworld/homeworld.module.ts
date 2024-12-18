import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeworldController } from "./controllers/homeworld.controller";
import { HomeworldService } from "./services/homeworld.service";
import { Homeworld } from "./entities/homeworld.entity";

@Module({
	imports: [TypeOrmModule.forFeature([Homeworld])],
	controllers: [HomeworldController],
	providers: [HomeworldService],
})
export class HomeworldModule {}
