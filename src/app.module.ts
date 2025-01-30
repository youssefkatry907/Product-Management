import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongoDBConfig } from './shared/config/db.config';
import { GlobalValidationProvider  } from './shared/validation/validation-exception.pipe';

@Module({
    imports: [
        MongoDBConfig,
        AuthModule
    ],
    controllers: [],
    providers: [
        GlobalValidationProvider
    ],
})
export class AppModule {}