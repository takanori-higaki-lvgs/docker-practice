import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SpreadsheetEnv } from './spreadsheet.config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
      isGlobal: true,
    }),
  ],
  providers: [SpreadsheetEnv],
  exports: [SpreadsheetEnv],
})
export class SpreadsheetEnvModule {}
