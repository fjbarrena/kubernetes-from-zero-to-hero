import "reflect-metadata";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { ApplicationContext } from "app.context";
import { Environment } from "./environments/environment";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { WinstonDailyRotateFileLogger } from "logger/WinstonDailyRotateFile.logger";
import { join } from "path";

// export declare var databaseConnection: Connection;
export declare var multer: any;
export declare var uuidv4: any;
let appEnv: Environment;
export declare var swaggerDocument: object;

async function bootstrap() {
  doRequires();

  // Ahora creamos la aplicación NEST
  const app = await NestFactory.create(AppModule, {
    // Deshabilitamos el logger por defecto de NestJS, vamos a utilizar nuestra propia implementación con Winston
    logger: new WinstonDailyRotateFileLogger()
  });
  Logger.log("app inicializada");

  // Enable cors
  app.enableCors();

  // TODO encontrar algun forma mejor de hacer esto
  appEnv = app.get(ApplicationContext).getApplicationEnvironment();

  // Accedemos a la instancia de Express para terminar de configurar el servidor
  app.setGlobalPrefix(appEnv.swaggerConfiguration.basePath);

  // Directorio de estáticos
  app.useStaticAssets(join(__dirname, "..", "public"));

  // No nos gusta la apariencia de la documentación automática del módulo de Swagger de NEST. Vamos a usar nuestra implementación.
  // Usamos el módulo de swagger para que genere automáticamente el json que leerá nuestro visor. Pero no usaremos el visor integrado en el módulo
  configureSwagger(app);

  app.listen(appEnv.serverConfiguration.port);

  Logger.log(
    "Application listening in port " + appEnv.serverConfiguration.port,
    "main.ts"
  );
}

function doRequires() {
  multer = require("multer");
  uuidv4 = require("uuid/v4");
}

function configureSwagger(_app: any) {
  const options = new DocumentBuilder()
    .setTitle(appEnv.swaggerConfiguration.title)
    .setDescription(appEnv.swaggerConfiguration.description)
    .setVersion(appEnv.swaggerConfiguration.version)
    .setBasePath(appEnv.swaggerConfiguration.basePath)
    .build();

  swaggerDocument = SwaggerModule.createDocument(_app, options);
}

bootstrap();
