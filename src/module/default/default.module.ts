import { Module } from '@nestjs/common';
import { IndexController } from './controller/index/index.controller';

import { AppService } from '../../app.service';
//引入其他模块
import { CommonModule } from '../common/common.module';

@Module({
  imports:[CommonModule],
  controllers: [IndexController],
  providers:[AppService]
})
export class DefaultModule {}
