import * as nodemailer from 'nodemailer';

import { Connection, getConnectionManager } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common';

import { Environment } from 'environments/environment';
import { EnvironmentService } from 'environments/environment.service';

@Injectable()
export class ApplicationContext {

    private databaseConnection: Connection;
    private readonly applicationEnvironment: Environment;
    private nodeMailerTransporter: any;

    private dbConnectionTrial: number = 0;

    constructor(private readonly environmentService: EnvironmentService) {
        this.applicationEnvironment = environmentService.get();
        this.createDatabaseConnection();
        this.configureMailServer();
        Logger.log('Application Context Initialized', ApplicationContext.name);
    }

    public getDatabaseConnection(): Connection {
        return this.databaseConnection;
    }

    public getApplicationEnvironment(): any {
        return this.applicationEnvironment;
    }

    public getNodeMailerTransporter(): any {
        return this.nodeMailerTransporter;
    }

    protected configureMailServer() {

        // Logger.log('Application context configureMailServer', ApplicationContext.name);
        this.nodeMailerTransporter = nodemailer.createTransport({
            host: this.applicationEnvironment.outboundMailConfiguration.host,
            port: this.applicationEnvironment.outboundMailConfiguration.port,
            secure: this.applicationEnvironment.outboundMailConfiguration.secure,
            // true for 465, false for other ports
            auth: {
                user: this.applicationEnvironment.outboundMailConfiguration.username,
                pass: this.applicationEnvironment.outboundMailConfiguration.password,
            },
        });
    }

    public async connectDatabaseFailover() {
        try {
            this.dbConnectionTrial++;

            Logger.log('Creating connection to database...', ApplicationContext.name);
            await this.databaseConnection.connect();
            Logger.log('Database connection created', ApplicationContext.name);
        } catch (ex) {
            Logger.warn('Database conection not stablished:' + ex.message, ApplicationContext.name);
            if (this.dbConnectionTrial < this.applicationEnvironment.boostrapConfiguration.dbConnectionMaxTrials) {
                setTimeout(() => {
                    this.connectDatabaseFailover();
                }, this.applicationEnvironment.boostrapConfiguration.dbConnectionTimeout);
            } else {
                // tslint:disable-next-line:max-line-length
                // DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
                // throw new Error('Max trials exceeded, aborting!');
                Logger.error('Max trials exceeded, aborting!');
                process.exit(1);
            }
        }
    }

    public async createDatabaseConnection() {
        // Creamos la conexión a la base de datos
        const connectionManager = getConnectionManager();
        this.databaseConnection = connectionManager.create(this.applicationEnvironment.databaseConnection);
        await this.connectDatabaseFailover();
    }

}