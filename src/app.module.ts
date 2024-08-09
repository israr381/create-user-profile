import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profiles/user-profiles.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserProfile } from './user-profiles/entities/user-profile.entity';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'user-profile',
      autoLoadEntities: true,
      synchronize: true,
      entities: [UserProfile, UserEntity],
    }),
    UsersModule,
    UserProfileModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
})
export class AppModule {}
