import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SpreadsheetEnv {
  constructor(private configService: ConfigService) {}

  get googleServiceAccountEmail(): string {
    return this.configService.get<string>('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  }

  get googlePrivateKey(): string {
    return this.configService.get<string>('GOOGLE_PRIVATE_KEY');
  }

  get googleSpreadsheetId(): string {
    return this.configService.get<string>('GOOGLE_SPREADSHEET_ID');
  }
}
