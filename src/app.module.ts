import { Module } from '@nestjs/common';
import { ConnectModule } from 'src/connect.module';
import { UserModule } from './modules/users.module';
import { PingModule } from './modules/ping_database.module';
import { RecipesModule } from './modules/recipes.module';
import { RecipeLikesModule } from './modules/recipe-likes.module';
import { FormsModule } from './modules/forms.module';
import { NotificationsGateway } from './notifications/notifications.gateway';

@Module({
  imports: [
    ConnectModule,
    UserModule,
    PingModule,
    RecipesModule,
    RecipeLikesModule,
    FormsModule,
  ],
  providers: [NotificationsGateway],
})
export class AppModule {}
