import type { ConfigService } from "@nestjs/config";
import type { DataSourceOptions } from "typeorm";
import { join } from "node:path";

export const getDatabaseConfig = (
	configService: ConfigService,
): DataSourceOptions => {
	return {
		type: "postgres",
		host: "db",
		port: 5432,
		username: configService.get<string>("DBUSERNAME"),
		password: configService.get<string>("DBPASS"),
		database: configService.get<string>("DBNAME"),
		entities: [
			join(__dirname, "..", "modules", "**", "entities", "*.entity.{ts,js}"),
		],
		synchronize: configService.get("NODE_ENV") !== "production",
	};
};
