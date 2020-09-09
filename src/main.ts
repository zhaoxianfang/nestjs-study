import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 引入http 静态资源
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

// 全局使用异常过滤器
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { GraphqlExceptionFilter } from './filter/graphql-exception.filter';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

import {AuthGuard} from './guard/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create(AppModule);


  app.useStaticAssets(join(__dirname, '..', 'public'), {   //配置虚拟目录
    // prefix: '/static/', //设置虚拟路径 
  });

  //注意首先必须安装模板引擎  npm install --save ejs
  // 设置模板
  app.setBaseViewsDir('views');
  // 设置模板引擎
  app.setViewEngine('ejs'); 

  //允许cookie跨域
  app.enableCors({
    origin:"http://localhost:8080",
    credentials:true
  });

  //配置cookie中间件
  app.use(cookieParser("this signed cookies"));
  //配置session的中间件
  app.use(session({ secret: 'keyboard my nestjs', cookie: { maxAge: 109000,httpOnly:true },rolling:true }));

  
  // 全局使用异常过滤器
  // app.useGlobalFilters(new HttpExceptionFilter())
  // app.useGlobalFilters(new GraphqlExceptionFilter()) // 未调通

  //全局配置守卫
  app.useGlobalGuards(new AuthGuard());
  
  // 使用配置文件中定义的端口启动项目，默认使用3000端口
  // await app.listen(
  //   process.env.PORT || app.get(ConfigService).get('express.port', 3000),
  // );
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  
}
bootstrap();
