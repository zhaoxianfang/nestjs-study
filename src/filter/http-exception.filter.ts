import { ExceptionFilter, Catch, ArgumentsHost ,HttpException ,Logger ,HttpStatus} from '@nestjs/common';
import { Request,Response} from 'express'

// https://blog.csdn.net/lxy869718069/article/details/103909718

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // HttpException 属于基础异常类，可自定义内容
    // 如果是自定义的异常类别则抛出自定义的status
    // 否则就是内置HTTP异常类，然后抛出其对应的内置status内容

    const status = 
      exception instanceof HttpException
        ?exception.getStatus()
        :HttpStatus.INTERNAL_SERVER_ERROR;
    
      // 抛出错误信息
      const message = 
        exception.message ||
        // exception.message.message || 
        // exception.message.message.error || 
        null;

      // console.log(exception)

      let msgLog = {
        code:status, // 系统错误状态
        // message:'请求失败',
        // data:message // 错误消息内容体（争取和拦截器中低钠盐的响应体一样）
        message:message, // 错误消息内容体（争取和拦截器中低钠盐的响应体一样）

        // timestamp: new Date().toISOString(), // 错误日期
        // path:request.url,  // 错误路由
      }

      // 打印错误综合日志
      Logger.error(
        '错误信息',
        JSON.stringify(msgLog),
        'HttpExceptionFilter'
      );

      response
       .status(status)
       .json(msgLog)

  }
}
