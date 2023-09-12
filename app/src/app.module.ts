import { Module } from '@nestjs/common';
import { SpreadsheetEnvModule } from './config/spreadsheet/spreadsheet.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [DatabaseModule, SpreadsheetEnvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
