import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { AppController } from "./app.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppService } from "./app.service";
import { getDatabaseConfig } from "./config/database.config";
import { seedDatabase } from "./config/seeds/seed";
import * as path from "node:path";

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
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
