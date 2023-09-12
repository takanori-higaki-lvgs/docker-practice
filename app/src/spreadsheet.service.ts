import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpreadsheetEnv } from './config/spreadsheet/spreadsheet.config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { UserService } from './user/user.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class SpreadsheetService {
  constructor(private readonly userService: UserService) {}

  async importSpreadsheet(): Promise<void> {
    await this.fetchSpreadsheetData();
    await this.saveSpreadsheetData();
  }

  private async fetchSpreadsheetData(): Promise<void> {
    const spreadsheetEnv = new SpreadsheetEnv(new ConfigService());
    const serviceAccountAuth = new JWT({
      keyFile: 'service_account/docker-practice-398306-548170a0c01d.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(
      spreadsheetEnv.googleSpreadsheetId,
      serviceAccountAuth,
    );
    doc.loadInfo().then(() => {
      console.log(doc.title);
      console.log(doc.sheetsByIndex[0].title);
    });
  }

  private async saveSpreadsheetData(): Promise<User> {
    const userCreateInput: Prisma.UserCreateInput = {
      name: 'test',
      data: 'testdata',
    };
    return await this.userService.createUser(userCreateInput);
  }
}
