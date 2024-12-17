import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import * as path from "node:path";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { getDatabaseConfig } from "./config/database.config";
import { seedDatabase } from "./config/seeds/seed";
import { CharactersModule } from "./modules/characters/characters.module";
import { HomeworldModule } from "./modules/homeworld/homeworld.module";
import { SpeciesModule } from "./modules/species/species.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: path.resolve(__dirname, "../../.env"),
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => {
				const config = getDatabaseConfig(configService);
				const dataSource = new DataSource(config);
				await dataSource.initialize();
				await seedDatabase(dataSource);
				return config;
			},
		}),
		ServeStaticModule.forRoot({
			rootPath: path.join(__dirname, "..", "public"),
			serveRoot: "/api",
		}),
		CharactersModule,
		HomeworldModule,
		SpeciesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
