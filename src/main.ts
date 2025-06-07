// src/main.ts

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';   // ①
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { join } from 'path';                                        // ②

dotenv.config();

async function bootstrap() {
  // Crear carpeta uploads si no existe
  const uploadDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`✔️ Creada carpeta de uploads en: ${uploadDir}`);
  }

  // Validar DB_PORT
  const rawPort = process.env.DB_PORT;
  if (!rawPort) throw new Error('La variable de entorno DB_PORT no está definida');
  const DB_PORT = parseInt(rawPort, 10);
  if (isNaN(DB_PORT)) throw new Error('DB_PORT debe ser un número entero válido');

  // Crear base de datos si no existe
  const tmpDataSource = new DataSource({
    type: 'mariadb',
    host: process.env.DB_HOST,
    port: DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'mysql',
  });
  await tmpDataSource.initialize();
  await tmpDataSource.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  );
  await tmpDataSource.destroy();

  // Arrancar NestJS **como NestExpressApplication** ✱
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // ③

  // Habilitar CORS
  app.enableCors({
    origin: '*',
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
    credentials: true,
  });

  // Exponer la carpeta uploads en '/uploads'
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log('🚀 Backend corriendo en http://localhost:3000');
}

bootstrap();
