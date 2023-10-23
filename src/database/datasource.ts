import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import * as config from "typeorm.config"
import { Shop } from "./entities/shop.entity";
import { UserProfile } from "./entities/user_profile.entity";


export const AppDataSource = new DataSource({
  type: 'postgres',
  host: "localhost",
  port: 5432,
  username: 'hoangpc',
  password: 'hoangpc1133',
  database: 'postgres',
  synchronize: false,
  entities: [
    __dirname + '/entities/*.entity.{js,ts}', Shop
  ],
  logging: true,
})

export class AppDataSources {
  constructor(
    private configService: ConfigService
  ){}
  private getConfig() {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
    }
  }
}

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })