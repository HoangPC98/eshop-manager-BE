import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { ServingFileService } from './serving-file.service';

@Controller('serving-file')
export class ServingFileController {
  constructor(private readonly servingFileService: ServingFileService) {

  }
  @Get('/img/:filename')
  getImg(@Param() params, @Res() resp: Response) {
    console.log('path', params)
    return resp.sendFile(process.cwd() + '/public/img/' + params.filename)
  }
}
