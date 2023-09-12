import { Module } from '@nestjs/common';
import { SpreadsheetEnvModule } from './config/spreadsheet/spreadsheet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpreadsheetService } from './spreadsheet.service';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    SpreadsheetEnvModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root_password',
      database: 'spreadsheet',
      entities: [],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [SpreadsheetService, UserService, PrismaService],
})
export class AppModule {}
