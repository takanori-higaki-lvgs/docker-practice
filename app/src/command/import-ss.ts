import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SpreadsheetService } from './../spreadsheet.service';

async function importSpreadsheet() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const spreadsheetService = new SpreadsheetService();
    await spreadsheetService.importSpreadsheet();
    console.log('Hello Command!');
  } finally {
    await app.close();
  }
}
importSpreadsheet();
