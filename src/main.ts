import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('example')
        .setDescription('API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.useGlobalPipes(new ValidationPipe());

    //
    //app.use(cors());///////////////////////////<=
    //Cross-origin resource sharing (CORS) is a mechanism that 
    // allows resources to be requested from another domain. 
    // app.use(compression({ level: 6 }));
    app.use(compression());
    app.enableCors();

    await app.listen(3001);
}
bootstrap();
