import { Logger } from '@nestjs/common';

export class ObjectUtils {
    static mapData(input: any, mapping: any): any {
        const output: any = {};

        if (ObjectUtils.isEmpty(mapping)) {
            Logger.log('Mapping Data is empty, nothing to map', ObjectUtils.name);
        }

        Object.getOwnPropertyNames(mapping).forEach(prop => {
            if (typeof mapping[prop] === 'string') {
                let nav = input;
                const arrayOfProps = mapping[prop].split('.');
                for (const _prop of arrayOfProps) {
                    if (nav) {
                        nav = nav[_prop];
                    }
                }
                if (nav) {
                    output[prop] = nav;
                }
            } else if (typeof mapping[prop] === 'object') {
                output[prop] = ObjectUtils.mapData(input, mapping[prop]);
            }
        });
        return output;
    }
    static isEmpty(obj) {
        return !obj || Object.keys(obj).length === 0;
    }
    static async delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}