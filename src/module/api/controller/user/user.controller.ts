import { Controller, Post, Body, Get, Request } from '@nestjs/common';
import { UserService } from '../../../../service/user/user.service';
import { AuthService } from '../../../../service/auth/auth.service';
// 公共的服务
import { AppService } from '../../../../app.service';

@Controller('api/user')
export class UserController {
    constructor (
        private userService:UserService,
        private appService:AppService,
        private authService:AuthService
    ){}

    @Post('register')
    async register(@Body() body: any) {
      console.log('body',body)
      return await this.userService.register(body);

    }

    // 获取token
    @Get('gettoken')
    async getToken(@Body() body: any) {

      // return this.authService.login({
      //   username: '张三', id: 1001
      // });
      return this.authService.login(body);
    }

    // token 获取用户存储在token中的用户信息
    // 请求格式  Authorization：Bearer+空格+token
    @Get('info')
    // getInfo(@Request() req) {
    getInfo(@Request() req) {
      return req.user;
    }

    @Get('find')
    async findUser(@Body() body: any) {
      console.log(body)

      return await this.userService.findOne(body);
    }
}
