import { CanActivate, ExecutionContext, Injectable, UseGuards } from '@nestjs/common';
import { Observable, from } from 'rxjs';
// 后台守卫
import { AdminAuthGuard } from './admin-auth.guard';
// 接口守卫
import { ApiAuthGuard } from './api-auth.guard';
// graphql守卫
import { GraphqlAuthGuard } from './graphql-auth.guard';
// 默认模块守卫
import { DefaultAuthGuard } from './default-auth.guard';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // console.log('我是公共 守卫')
    // 先不验证
    
    const contextType = context.switchToHttp()['contextType']; // 请求类型 graphql 或者http
    // console.log('我是公共 守卫',contextType == 'graphql')
    // return true;
    if(contextType == 'graphql'){
      return (new GraphqlAuthGuard()).canActivate(context);
    }else{

      const request = context.switchToHttp().getRequest();
      let route_arr = (request.route.path).substr(1).split("/")
      let moduleName= route_arr.length >0? route_arr['0'].toLowerCase() : ''

      // console.log('auth守卫',moduleName)

      switch (moduleName) {
        case 'admin':
          return (new AdminAuthGuard()).canActivate(context);
          break;
        case 'api':
          return (new ApiAuthGuard()).canActivate(context);
          break;
        case '':
          return (new DefaultAuthGuard()).canActivate(context);
          break;
        default:
          break;
      }
    }

    return true;
  }
}
