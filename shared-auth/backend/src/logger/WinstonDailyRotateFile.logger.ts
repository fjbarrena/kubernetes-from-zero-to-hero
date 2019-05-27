import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class WinstonDailyRotateFileLogger implements LoggerService {
    private logger: any;
    private winstonLogger: any;

    constructor() {
        this.doRequires();

        const dailyTransport = new (this.winstonLogger.transports.DailyRotateFile)({
            filename: 'logs/%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxSize: '100m',
            maxFiles: '30d',
        });

        this.logger = this.winstonLogger.createLogger({
            level: 'info',
            format: this.winstonLogger.format.printf(info => `[${info.level.toUpperCase()}] - [${new Date().toLocaleString()}] - ${info.message}`),
            transports: [
                dailyTransport,
                new this.winstonLogger.transports.Console(),
            ],
        });
    }

    log(message: string) {
        this.logger.log('info', message);
    }

    error(message: string, trace: string) {
        this.logger.log('error', message);
        this.logger.log('error', trace);
    }

    warn(message: string) {
        this.logger.log('warn', message);
    }

    doRequires() {
        this.winstonLogger = require('winston');
        require('winston-daily-rotate-file');
    }
}