import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) { }

    // @Public()
    // @Get()
    // getHello(): string {
    //     return this.appService.getHello();
    // }
}
