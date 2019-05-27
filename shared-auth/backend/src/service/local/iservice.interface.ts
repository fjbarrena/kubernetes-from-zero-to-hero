import { InsertResult } from 'typeorm';

export interface IService<ENTITY> {
    getRepository();

    findAll(): Promise<ENTITY[]>;

    findById(id: any): Promise<ENTITY>;

    findByIds(ids: any[]): Promise<ENTITY[]>;

    destroy(object: ENTITY): Promise<ENTITY>;

    destroyMultiple(object: ENTITY[]): Promise<ENTITY[]>;

    insert(object: ENTITY): Promise<InsertResult>;

    update(object: ENTITY): Promise<ENTITY>;

    count(): Promise<number>;
}