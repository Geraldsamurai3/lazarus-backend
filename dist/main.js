"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const path_1 = require("path");
dotenv.config();
async function bootstrap() {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`✔️ Creada carpeta de uploads en: ${uploadDir}`);
    }
    const rawPort = process.env.DB_PORT;
    if (!rawPort)
        throw new Error('La variable de entorno DB_PORT no está definida');
    const DB_PORT = parseInt(rawPort, 10);
    if (isNaN(DB_PORT))
        throw new Error('DB_PORT debe ser un número entero válido');
    const tmpDataSource = new typeorm_1.DataSource({
        type: 'mariadb',
        host: process.env.DB_HOST,
        port: DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: 'mysql',
    });
    await tmpDataSource.initialize();
    await tmpDataSource.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`);
    await tmpDataSource.destroy();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: '*',
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    await app.listen(3000);
    console.log('🚀 Backend corriendo en http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map