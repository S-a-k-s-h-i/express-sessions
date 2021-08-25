import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { SessionSerializer } from './session.serializers';
import { LocalStrategy } from './strategies/local/local.strategy';

@Module({
  imports:[
    UserModule,
    PassportModule.register({session:true}),
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,SessionSerializer]
})
export class AuthModule {}
