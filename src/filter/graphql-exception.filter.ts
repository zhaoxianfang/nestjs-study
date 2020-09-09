import { ArgumentsHost, Catch, HttpException,Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
// import { Logger } from 'nestjs-pino';

/**
 * @description graphql异常过滤器
 */
@Catch()
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  // constructor(private logger: Logger) {}
  getRequestFromCtx(ctx) {
    for (const arg of ctx.args) {
      console.log('GraphqlExceptionFilter')
      if (arg && arg.request && arg.request.url) {
        return arg.request;
      }
    }
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    let message = exception.message;
    try {
      message = JSON.parse(message);
    } catch (error) {
      // 异常错误
      const ctx = gqlHost.switchToHttp();
      const request = {
        graphql: {
          args: gqlHost.getArgs(),
          root: gqlHost.getRoot(),
        },
      };
    }
    // TODO: logger error

    return exception;
  }
}
