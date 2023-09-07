import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpreadsheetEnvModule } from './config/spreadsheet/spreadsheet.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, SpreadsheetEnvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
