import { Module } from '@nestjs/common';
import { ServingFileService } from './serving-file.service';
import { ServingFileController } from './serving-file.controller';

@Module({
  controllers: [ServingFileController],
  providers: [ServingFileService]
})
export class ServingFileModule {}
