import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
// 引入graphql
import { GraphQLModule } from '@nestjs/graphql';
// 引入typeORM
import { TypeOrmModule } from '@nestjs/typeorm'
// 引入配置
import { ConfigModule, ConfigService } from 'nestjs-config';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';
import { CommonModule } from './module/common/common.module';
import { FilterModule } from './filter/filter.module';
import { ServiceModule } from './service/service.module';
import { ResolverModule } from './resolver/resolver.module';
import { DecoratorModule } from './decorator/decorator.module';

// 获取环境变量
const ENV = process.env.NODE_ENV;
import * as path from 'path';

@Module({
  imports: [
    // 这里指定了需要读取当前目录下的的 config目录中的 以 ts/js结尾的文件
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}'), {
      path: path.resolve(process.cwd(), !ENV ? '.env' : `.env.${ENV}`),
      // 这里根据环境变量读取指定的.env文件，默认读取.env文件 文件名格式示例 .env.develop .env.production
    }),

    // 注册数据库模块配置
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),

    AdminModule,

    ApiModule,

    DefaultModule,

    CommonModule,

    FilterModule,

    ServiceModule,

    // 引入 graphql 后缀文件
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'], // 加载所有以.graphql 结尾的 文件
      context: ({ req }) => ({ req }), // 将 request (req)对象作为上下文值的一部分传递
    }),

    ResolverModule,

    DecoratorModule
  ],
  // controllers: [AppController],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
