  // 数据库配置
  export default {
    type: process.env.TYPEORM_TYPE || 'mysql',
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: parseInt(process.env.TYPEORM_PORT),
    logging: process.env.TYPEORM_LOGGING === 'true',
    entities: ["dist/**/*.entity{.ts,.js}"], // 实体,
    // migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true', // 是否实体自动创建表
};