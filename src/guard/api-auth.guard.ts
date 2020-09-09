// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

// 路由白名单
import { routeWhite } from '../config/route_white';

@Injectable()
export class ApiAuthGuard extends AuthGuard('jwt') {

  // canActivate(context: ExecutionContext) {
  //   // 在这里添加自定义的认证逻辑
  //   // 例如调用 super.logIn(request) 来建立一个session
  //   return super.canActivate(context);
  // }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    console.log('api auth守卫',request.route.path)
    
    let path = request.route.path.toString()
    console.log(path)
    if( routeWhite.indexOf( path ) != -1){
      // 在白名单内
      console.log('跳过白名单路由',path)
      return true;
    }

    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session
    return super.canActivate(context);
    // return true;
  }

  handleRequest(err, user, info) {
    // 可以抛出一个基于info或者err参数的异常
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    
    return user;
  }
}
