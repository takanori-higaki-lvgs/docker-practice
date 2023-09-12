import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpreadsheetEnv } from './config/spreadsheet/spreadsheet.config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { UserService } from './user/user.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpreadsheetService {
  constructor(private readonly userService: UserService) {}

  async importSpreadsheet(latestUserId: number = null): Promise<void> {
    const userList = await this.fetchSpreadsheetData(latestUserId);
    await this.saveSpreadsheetData(userList);
  }

  private async fetchSpreadsheetData(
    latestUserId: number = null,
  ): Promise<Array<Prisma.UserCreateInput>> {
    const spreadsheetEnv = new SpreadsheetEnv(new ConfigService());

    // GoogleServiceAccount情報
    const serviceAccountAuth = new JWT({
      keyFile: 'service_account/docker-practice-398306-548170a0c01d.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    // スプレッドシートのIDを指定して、ドキュメントオブジェクトを作成
    const doc = new GoogleSpreadsheet(
      spreadsheetEnv.googleSpreadsheetId,
      serviceAccountAuth,
    );

    const userList: Array<Prisma.UserCreateInput> = [];
    // ドキュメントのデータを読み込む
    await doc.loadInfo().then(async () => {
      console.log(doc.title);
      console.log(doc.sheetsByIndex[0].title);
      const title = doc.sheetsByIndex[0].title;
      const sheet = doc.sheetsByTitle[title];
      const options = {
        offset: latestUserId,
        limit: 100,
      };
      const rows = await sheet.getRows(options);
      rows.map((row) => {
        const newUser: Prisma.UserCreateInput = {
          name: row.get('NAME'),
          data: row.get('DATA'),
        };
        userList.push(newUser);
      });
    });

    return userList;
  }

  private async saveSpreadsheetData(
    userList: Array<Prisma.UserCreateInput>,
  ): Promise<void> {
    userList.map(async (user) => {
      await this.userService.createUser(user);
    });
  }
}
