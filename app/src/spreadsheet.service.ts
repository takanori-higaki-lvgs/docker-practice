import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpreadsheetEnv } from './config/spreadsheet/spreadsheet.config';
// import { GoogleSpreadsheet } from 'google-spreadsheet';
// import { JWT } from 'google-auth-library';

@Injectable()
export class SpreadsheetService {
  async importSpreadsheet(): Promise<void> {
    await this.fetchSpreadsheetData();
    await this.saveSpreadsheetData();
  }

  private async fetchSpreadsheetData(): Promise<void> {
    console.log(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
    const spreadsheetEnv = new SpreadsheetEnv(new ConfigService());
    console.log(spreadsheetEnv.googleServiceAccountEmail);
    // const serviceAccountAuth = new JWT({
    //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // });
    // const doc = new GoogleSpreadsheet(
    //   process.env.GOOGLE_SPREADSHEET_ID,
    //   serviceAccountAuth,
    // );

    // await doc.loadInfo();
    // console.log(doc.title);
  }

  private saveSpreadsheetData(): void {}
}
