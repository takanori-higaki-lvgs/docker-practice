import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SpreadsheetEnv } from './config/spreadsheet/spreadsheet.config';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class SpreadsheetService {
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

    const oauth2Client = new google.auth.OAuth2(
      // spreadsheetEnv.googleSpreadsheetClientId,
      // spreadsheetEnv.googleSpreadsheetClientSecret,
      '755261652761-qeuipjplv4hu9jq72oc5csl5efbb2s2e.apps.googleusercontent.com',
      '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',
      'http://localhost',
    );

    const redirectUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    console.log('認証URL:');
    console.log(redirectUrl);

    // const code =
    // '4/0Adeu5BVAeBgjLbaM6Vr_J1rtf6JD6mW047bm-I0c-2inEGUuLAasOn5Mz_y8LqarGaz8TQ'; // ユーザーから受け取った認可コード

    const code =
      '4/0Adeu5BXlpcOqN5IoaKtkS5Nw1aLCAldkc6GVR4ZZtWX9di67lNFg5qaptxM_2W4rvGTDrg';

    oauth2Client.getToken(code, (err, tokens) => {
      if (err) {
        console.error('トークンを取得できませんでした:', err);
        return;
      }

      // トークンを保存するなどの適切な処理を行う
      const accessToken = tokens.access_token;
      const refreshToken = tokens.refresh_token;

      console.log('アクセストークン:', accessToken);
      console.log('リフレッシュトークン:', refreshToken);
    });
  }

  private saveSpreadsheetData(): void {}
}
