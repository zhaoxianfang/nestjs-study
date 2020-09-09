import { Module } from '@nestjs/common';
import { UserController } from './controller/user/user.controller';

import { AppService } from '../../app.service';

//引入其他模块
import { ServiceModule } from '../../service/service.module';

// 配置model
import { TypeOrmModule } from '@nestjs/typeorm'

import { KmUser } from '../../entity/KmUser.entity'
// import { UserResolver } from 'src/resolver/user/user.resolver';

@Module({
  imports:[ServiceModule,TypeOrmModule.forFeature([KmUser])],
  controllers: [UserController],
  // providers:[AppService, UserResolver]
  providers:[AppService]
})
export class ApiModule {}
