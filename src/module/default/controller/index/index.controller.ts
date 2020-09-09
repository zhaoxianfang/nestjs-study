import { Controller, Get, Render } from '@nestjs/common';

import { AppService } from '../../../../app.service';

@Controller()
export class IndexController {
  
    constructor(private appService:AppService){}

  /**
   * 项目欢迎页
   */
  @Get()
  @Render('default/index')
  getHome() {
    // console.log(this.baseService.getData());
    return {"sys_title":"志愿昆明"};
  }
}
