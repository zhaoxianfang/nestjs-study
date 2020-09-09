import { Resolver ,Query, Args, Mutation} from '@nestjs/graphql';

import { UserService } from '../../service/user/user.service';
import { AuthService } from '../../service/auth/auth.service';

import { Request, Body,UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from '../../guard/graphql-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';

@Resolver('User')
export class UserResolver {

    constructor (
        private readonly userService:UserService,
        private readonly authService:AuthService
    ){}


    @Query('hello')
    hello(@CurrentUser() user){
        console.log(user)
        return 'hello'
    }

    @Query('login')
    async login(@Body() body){
        console.log(body)
        // console.log(user)
        // return await this.userService.test({id:id});
        let token =  await this.authService.login(body);
        console.log(token)
        return 'login'
    }

    @Query('findUser')
    @UseGuards(GraphqlAuthGuard)
    async findUser(@Args("id") id, @Body() body,@CurrentUser() user){
        console.log(body)
        // console.log(user)
        console.log(id)
        return await this.userService.test({id:id});
    }

    @Query('users')
    users(){
        return [
            { 
                id: 1 ,
                username: "用户名",
                nickname: "昵称",
            },
            { 
                id: 2 ,
                username: "用户名",
                nickname: "昵称",
            }
        ]
    }

    // 添加
    @Mutation("addUser")
    addUser(@Args('user') user){
        console.log(user)
        return { 
            id: 100 ,
            username: user.username,
            nickname: user.nickname
        }
    }

}
