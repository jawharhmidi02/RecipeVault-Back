import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/constants/jwt.constant';
import { FormsController } from 'src/controllers/forms.controller';
import { Forms } from 'src/entities/forms.entity';
import { Users } from 'src/entities/users.entity';
import { FormsService } from 'src/services/forms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forms, Users]),
    JwtModule.register({ secret: jwtConstants.secret, global: true }),
  ],
  providers: [FormsService],
  controllers: [FormsController],
})
export class FormsModule {}
