import { Module } from '@nestjs/common';
import { WinstonDailyRotateFileLogger } from './WinstonDailyRotateFile.logger';

@Module({
    exports: [WinstonDailyRotateFileLogger],
})
export class LoggerModule {}
