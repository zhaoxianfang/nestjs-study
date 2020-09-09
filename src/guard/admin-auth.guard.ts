import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
// 路由白名单
import { routeWhite } from '../config/route_white';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('我是admin 守卫')

    const request = context.switchToHttp().getRequest();
    console.log('admin auth守卫',request.route.path)
    // console.log('admin auth守卫',request.route.path)
    // console.log('admin auth守卫',request.headers)
    // console.log('admin auth守卫',request.baseUrl)
    // console.log('admin auth守卫',request.originalUrl)
    // console.log('admin auth守卫',request.route)
    // console.log('admin auth守卫',request.body)

    let path = request.route.path.toString()
    if( routeWhite.indexOf( path ) != -1){
      // 在白名单内
      console.log('跳过白名单路由',path)
      return true;
    }
    return true;
  }
}
