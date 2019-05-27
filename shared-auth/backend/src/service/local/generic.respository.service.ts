import { Connection, InsertResult, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';

import { ApplicationContext } from 'app.context';
import { Environment } from 'environments/environment';
import { IService } from './iservice.interface';

export abstract class GenericService<ENTITY> implements IService<ENTITY>  {

    protected repository: Repository<ENTITY>;
    protected environment: Environment;
    protected databaseConnection: Connection;

    constructor() { }

    // We need to do this way because of the order Nestjs injects dependencies
    init(): void {
        this.environment = this.getApplicationConext().getApplicationEnvironment();
        this.databaseConnection = this.getApplicationConext().getDatabaseConnection();
        this.getRepositoryFailover();
    }
    public async getRepositoryFailover(): Promise<void> {
        try {
            const reponame: string = await this.getRepository();
            Logger.log(`Repository ${reponame} initialized`, GenericService.name);
        } catch (ex) {
            Logger.warn(ex, GenericService.name);
            setTimeout(() => {
                this.getRepositoryFailover();
            }, this.environment.boostrapConfiguration.dbConnectionTimeout);
        }
    }

    public abstract async getRepository(): Promise<string>;

    public abstract getApplicationConext(): ApplicationContext;

    async findAll(): Promise<ENTITY[]> {
        return await this.repository.find();
    }

    async findById(id: any): Promise<ENTITY> {
        const response = await this.repository.findOne(id);
        if (!response) throw new NotFoundException();
        return response;
    }

    async findOne(condition: any): Promise<ENTITY> {
        const response = await this.repository.findOne(condition);
        if (!response) throw new NotFoundException();
        return response;
    }

    async findByIds(ids: any[]): Promise<ENTITY[]> {
        return await this.repository.findByIds(ids);
    }

    async destroy(object: ENTITY): Promise<ENTITY> {
        return await this.repository.remove(object);
    }

    async destroyMultiple(object: ENTITY[]): Promise<ENTITY[]> {
        return await this.repository.remove(object);
    }

    async insert(object: ENTITY): Promise<InsertResult> {
        return await this.repository.insert(object);
    }

    async update(object: ENTITY): Promise<ENTITY> {
        return await this.repository.save(object as any);
    }

    async count(): Promise<number> {
        return await this.repository.count();
    }
}