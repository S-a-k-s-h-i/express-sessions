import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthenticatedGuard } from '../../guards/authenticate/authenticated.guard';
import { LocalAuthGuard } from '../../guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor() {}
    
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req) {
        return {'msg':'Logged in!!!'};
    }
    
    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    getHello(@Request() req){
        return req.user
    }
    
}
