import { NestFactory } from '@nestjs/core';
import { AppModule } from './../app.module';

async function importGoogleSpreadSheet() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    console.log('Hello Command!');
  } finally {
    await app.close();
  }
}
importGoogleSpreadSheet();
