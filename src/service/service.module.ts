import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';

// 配置model
import { TypeOrmModule } from '@nestjs/typeorm'

import { KmUser } from '../entity/KmUser.entity'

// 配置jwt
import { LocalStrategy } from '../service/auth/local.strategy';
import { JwtStrategy } from '../service/auth/jwt.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { constantList } from '../config/constants';

@Module({
  imports:[
    TypeOrmModule.forFeature([KmUser]),
    // UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: constantList.JWT_SECRET,
      signOptions: { expiresIn: constantList.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    UserService,
    AuthService,
    LocalStrategy, 
    JwtStrategy
  ],
  exports:[UserService,AuthService]   //暴露服务  暴露出去以后引入当前模块的模块就可以使用当前模块里面的服务
})
export class ServiceModule {}
