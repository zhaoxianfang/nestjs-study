import { Module } from '@nestjs/common';

import { AppService } from '../../app.service';
//引入其他模块
import { CommonModule } from '../common/common.module';

// 配置model
import { TypeOrmModule } from '@nestjs/typeorm'

import { KmUser } from '../../entity/KmUser.entity'
import { UserController } from './controller/user/user.controller';

@Module({
  imports:[CommonModule,TypeOrmModule.forFeature([KmUser])],
  controllers: [UserController],
  providers:[AppService]
})
export class AdminModule {}
