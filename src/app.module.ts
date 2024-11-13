import { Module } from '@nestjs/common';
import { ConnectModule } from 'src/connect.module';
import { UserModule } from './modules/users.module';
import { PingModule } from './modules/ping_database.module';
import { RecipesModule } from './modules/recipes.module';
import { RecipeLikesModule } from './modules/recipelikes.module';

@Module({
  imports: [
    ConnectModule,
    UserModule,
    PingModule,
    RecipesModule,
    RecipeLikesModule,
  ],
})
export class AppModule {}
