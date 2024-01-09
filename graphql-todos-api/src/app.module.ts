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
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ListsModule } from './lists/lists.module';
import { ListTodosModule } from './list-todos/list-todos.module';
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
        buildSchemaOptions: {
          dateScalarMode: 'isoDate',
        },
        playground: false,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context() {
          // const token = req.headers.authorization?.replace('Barer ', '');
          // if (!token) throw Error('No token provided');
          // const payload = jwtService.decode(token);
          // if (!payload) throw Error('Invalid token');
        },
      }),
    }),
    TypeOrmModule.forRoot(DatabaseConfig.defaultOptions),
    TodoModule,
    AccountsModule,
    AuthenticationModule,
    SeedModule,
    CommonModule,
    ListsModule,
    ListTodosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
