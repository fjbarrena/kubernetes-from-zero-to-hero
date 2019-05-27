import { Logger } from '@nestjs/common';

/**
 *  Abstract DTO que disminuye el generacion codigo en los DTOS originales
 *  Usa relfection para obtener las variables de clase
 *
 *  IMPORTANTE: Como typescript compila a JS, hay que inicializar las variables
 *  a null para que funcione correctamtente el reflection.
 */
export abstract class GenericDTO<ENTITY>{

    constructor() {
    }

    // Define Entity class to enable conversion from/to DTO/Entity
    abstract getEntity(): ENTITY;

    public fromDBEntity(entity?: ENTITY): any {
        if (entity) {
            Object.getOwnPropertyNames(entity).forEach(prop => {
                if (typeof entity[prop] !== 'function' && this[prop] !== undefined) {
                    this[prop] = entity[prop];
                }
            });
        } else {
            Logger.warn('entity is null, nothing to copy');
        }
        return this;
    }

    public toDBEntity(): ENTITY {
        const entity = this.getEntity();
        if (entity) {
            Object.getOwnPropertyNames(this).forEach(prop => {
                if (typeof this[prop] !== 'function' && entity[prop] !== undefined) {
                    entity[prop] = this[prop];
                }
            });
        } else {
            Logger.warn('DTO not properly initialized, missing Entity');
        }
        return entity;
    }

    public create(object?: any): void {
        if (object) {
            Object.getOwnPropertyNames(object).forEach(prop => {
                if (typeof object[prop] !== 'function' && this[prop] !== undefined) {
                    this[prop] = object[prop];
                }
            });
        }
    }

}