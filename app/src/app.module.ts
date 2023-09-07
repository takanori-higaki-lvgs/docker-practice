import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpreadsheetEnvModule } from './config/spreadsheet/spreadsheet.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'spreadsheet',
      entities: [],
      synchronize: true,
    }),
    SpreadsheetEnvModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
