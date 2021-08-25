import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { SampleDto } from './sample.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
    return this.appService.getHello();
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('file')
    uploadFile(
        @Body() body: SampleDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return {
        body,
        file: file.buffer.toString(),
        };
    }
}
