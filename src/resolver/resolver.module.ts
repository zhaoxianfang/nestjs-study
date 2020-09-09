import { Module } from '@nestjs/common';
import { UserResolver } from './user/user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KmUser } from 'src/entity/KmUser.entity';
import { UserService } from 'src/service/user/user.service';
import { AuthService } from 'src/service/auth/auth.service';


//引入其他模块
import { ServiceModule } from '../service/service.module';
import { AppService } from 'src/app.service';

@Module({
  providers: [UserResolver, AppService],
  imports: [ServiceModule,TypeOrmModule.forFeature([KmUser]) ]
})
export class ResolverModule {}
