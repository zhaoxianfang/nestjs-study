import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService
      ) {}
    
      async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(reqUser: any) {
        if(!reqUser || !reqUser.mobile){
          return {
            code: 403,
            msg: '账号不能为空',
          };
        }
        console.log('reqUser',reqUser)
        let user = await this.usersService.findOne(reqUser)
        if (!user) {
          return {
            code: 404,
            msg: '账号或者密码不存在',
          };
        }
        const payload = { username: user.username, sub: user.id };
        return {
          code:200,
          message:'登录成功',
          data:{
            access_token: this.jwtService.sign(payload),
          }
        };
      }
}
