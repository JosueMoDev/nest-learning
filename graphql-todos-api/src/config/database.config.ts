import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const configservice = new ConfigService();
export class DatabaseConfig {
  static get defaultOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: configservice.get('DB_PORT'),
      host: configservice.get('DB_HOST'),
      username: configservice.get('DB_USER'),
      password: configservice.get('DB_PASSWORD'),
      database: configservice.get('DB_NAME'),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
