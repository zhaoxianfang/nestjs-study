import { Injectable } from '@nestjs/common';


// 引入 InjectRepository 装饰器
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KmUser } from '../../entity/kmUser.entity';


import { User as userInterface } from '../../interface/user.interface'

// 引入加密函数
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; 
// 引入助手函数
import * as helper from '../../utils/helper'; 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(KmUser) private readonly userRepository: Repository<KmUser>,
    ) {}

    /**
     * 
     * @param json 查询单用户
     */
    async findOne(json){
      console.log(json)
        // let user = await this.userRepository.findOneOrFail(json);
        let user = await this.userRepository.findOne(json);
        console.log(user)
        
        return user
    }

    async test(json){
        console.log('json',json)

        let user = await this.userRepository.findOne(json);
        console.log(user)
        
        return user
    }


    /**
     * 注册
     * @param userJson 请求体
     */
    //   async register(userJson: userInterface){
    async register(userJson){
    // console.log(userJson)
    // const { accountName, realName, password, repassword, mobile } = userJson;
    // const { password } = userJson;
    // if (password !== repassword) {
    //   return {
    //     code: 400,
    //     msg: '两次密码输入不一致',
    //   };
    // }
    const user = await this.findOne(userJson);
    if (user) {
      return {
        code: 400,
        msg: '用户已存在',
      };
    }
    // console.log('next')

    const salt = makeSalt(); // 制作密码盐
    const hashPwd = encryptPassword(userJson.password, salt);  // 加密密码
    const timestamp = helper.timestamp(); // 10位时间戳
    userJson.salt = salt
    userJson.password = hashPwd
    userJson.create_time = timestamp
    
    console.log(userJson)

    // let insertRes = await this.userRepository
    //     .createQueryBuilder()
    //     .insert()
    //     .into(KmUser)
    //     .values(await userJson)
    //     .execute();

    let insertRes = await this.userRepository.insert(await userJson);
    
    // return insertRes
    // return insertRes.raw.insertId
    return {
      code:200,
      message:'注册成功',
      data:{
        id:insertRes.raw.insertId
      }
    }  
  }

 // 获取token
  async createToken(userinfo: any, expiration: number) {
    return {
      code:500,
      message:'test'
    }
  }
  
}
