import { Module } from '@nestjs/common';
import { UserService } from './service/user/user.service';

// 配置model
import { TypeOrmModule } from '@nestjs/typeorm'

import { KmUser } from '../../entity/KmUser.entity'

@Module({
  imports:[TypeOrmModule.forFeature([KmUser])],
  providers: [ UserService],
  exports:[UserService]   //暴露服务  暴露出去以后引入当前模块的模块就可以使用当前模块里面的服务
})
export class CommonModule {}
