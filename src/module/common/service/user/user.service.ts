import { Injectable } from '@nestjs/common';

// 引入 InjectRepository 装饰器
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KmUser } from '../../../../entity/KmUser.entity';

import { User as userInterface } from '../../../../interface/user.interface'
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(KmUser) private readonly userRepository: Repository<KmUser>,
    ) {}

    async select(json){
        let data = await this.userRepository.find(json);
        console.log(data)
        return data

        // let data = await this.userRepository.createQueryBuilder('user')
        // // .innerJoinAndSelect("vol_groups", "groups", "groups.group_id = user.id")
        // // .innerJoinAndSelect('user.group', "group", "group.group_id = user.id")
        // // .innerJoinAndSelect(VolGroups, "group", "group.group_id = user.id")
        // // .innerJoin(VolGroups, "group", "group.group_id = user.id")


        // // .leftJoinAndSelect('user.group', "group")
        // .leftJoinAndSelect('user.group', "group","group.group_id = user.id")


        // // .leftJoinAndMapOne("user.group", "user.VolGroups", "group", "group.group_id = user.id")
        // // .leftJoinAndMapOne('user.group', "group", "group.group_id = user.id")
        // // .from(KmUser, "user")
        // // .from(VolGroups, "group")
        // // .select(["group","user"])
        // .select([
        //     "user.id",
        //     "user.username",
        //     "group.groupName",
        // ])
        // // .relation(VolGroups)
        // .andWhere('user.id = 1')
        // // .orderBy({
        // //     "user.id": "DESC"
        // // })
        // .getMany();
        
        // console.log(data)
        // // console.log(data['group'])
        // return data
    }
    async find(json){
        let data = await this.userRepository.findOneOrFail(json);
        console.log(data)
        
        return data
    }

    // async select(select,where,join,order,cache,skip,take){
    //     // return {'name':'test'};
    //     let data = await this.userRepository.find({
    //         select:select?select: [],
    //         where:where || '',
    //         join:join || '',
    //         order:order,
    //         cache:cache || false,
    //         skip: skip, //跳过前n个
    //         take: take, //获取m个
    //         // select: ["username", "status"],
    //         // relations: ["profile", "photos", "videos"],
    //         // join: {
    //         //     alias: "user",
    //         //     leftJoinAndSelect: {
    //         //         profile: "user.profile",
    //         //         photo: "user.photos",
    //         //         video: "user.videos"
    //         //     }
    //         // },
    //         // order: {
    //         //     id: "DESC"
    //         // },
    //         // where: [
    //         //     { firstName: "Timber", lastName: "Saw" },
    //         //     { firstName: "Stan", lastName: "Lee" }
    //         // ],
    //         // skip: 5, //跳过前5个
    //         // take: 10, //获取10个
    //         // cache: true
    //     });
    //     console.log(data)
    //     return data
    // }
    // async select(select,where,join,order,cache,skip,take){
    //     // return {'name':'test'};
    //     let data = await this.userRepository.find({
    //         select:select?select: [],
    //         where:where || '',
    //         join:join || '',
    //         order:order,
    //         cache:cache || false,
    //         skip: skip, //跳过前n个
    //         take: take, //获取m个
    //         // select: ["username", "status"],
    //         // relations: ["profile", "photos", "videos"],
    //         // join: {
    //         //     alias: "user",
    //         //     leftJoinAndSelect: {
    //         //         profile: "user.profile",
    //         //         photo: "user.photos",
    //         //         video: "user.videos"
    //         //     }
    //         // },
    //         // order: {
    //         //     id: "DESC"
    //         // },
    //         // where: [
    //         //     { firstName: "Timber", lastName: "Saw" },
    //         //     { firstName: "Stan", lastName: "Lee" }
    //         // ],
    //         // skip: 5, //跳过前5个
    //         // take: 10, //获取10个
    //         // cache: true
    //     });
    //     console.log(data)
    //     return data
    // }

    async insert(userJson:userInterface){ 
        // try {
            let insertTes = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(KmUser)
                .values(userJson)
                .execute();
            
            return insertTes
        // } catch (error) {
        //     return {
        //         'code':error.errno, // mysql 错误码
        //         'message':error.sqlMessage // mysql 错误信息
        //     }
        // }

    }

}
