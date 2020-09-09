import { Controller,Get, UseFilters } from '@nestjs/common';

//公共的服务
import { AppService } from '../../../../app.service';

import { HttpExceptionFilter } from '../../../../filter/http-exception.filter'

@Controller('admin/user')
export class UserController {
    constructor (private appService:AppService){}

    @Get()
    index(){
        // let test = this.userService.select({ id: 1 })
        // return test;
        return 'admin / user 入口'
    }

    @Get('add')
    // @UseFilters(HttpExceptionFilter)
    addUser(){
        // let insertInfo = this.userService.insert({ 
        //     username: "Timber", 
        //     nickname:  "testName",
        //     password:  "password",
        //     salt:  "132",
        //     gender:  1,
        //     mobile:  "15687856324",
        //     create_time:  (new Date()).getTime()/1000,
        //     status:  1,
        // })
        // console.log(insertInfo)
        // return insertInfo
        return {'name':'test'}
    }

    @Get('test')
    test(){
        return '路由白名单配置'
    }
}