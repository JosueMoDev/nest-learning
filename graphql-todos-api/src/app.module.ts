import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthenticationModule } from './authentication/authentication.module';
import { AccountsModule } from './accounts/accounts.module';
import { TodoModule } from './todo/todo.module';
import { DatabaseConfig } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthenticationModule],
      inject: [JwtService],
      useFactory: async () => ({
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        // context({ req }) {
        //   const token = req.headers.authorization?.replace('Barer', '');
        //   if (!token) throw Error('No token provided');
        //   const payload = jwtService.decode(token);
        //   if (!payload) throw Error('Invalid token');
        // },
      }),
    }),
    TypeOrmModule.forRoot(DatabaseConfig.defaultOptions),
    TodoModule,
    AccountsModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
