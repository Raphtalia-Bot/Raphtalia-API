import {DataTypes, Model} from 'https://deno.land/x/denodb@v1.0.23/mod.ts';
import {SnowflakeGenerator} from "../util/Snowflake.ts";

export class Module extends Model {
    static table = "modules";
    static fields = {
        _id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        owner: DataTypes.STRING,
        address: DataTypes.STRING
    };
}

export default new class {
    async getModule(id: string, userId?: string): Promise<Module> {
        const DBModule = await Module.find(id);
        if(userId !== DBModule.owner) DBModule.address = null;
        return DBModule;
    }
    async getModules(userId?: string): Promise<Module[]> {
        const DBModules = await Module.all();
        DBModules.forEach(module => {
            if(userId !== module.owner) {
                module.address = null;
            }
        });
        return DBModules;
    }
    async createModule(name: string, description: string, owner: string, address: string): Promise<Module> {
        return await Module.create({
            // @ts-ignore
            _id: new SnowflakeGenerator({mid: 42, offset: Deno.env.get('RAPHTALIA_EPOCH')}).generate(),
            name: name,
            description: description,
            owner: owner,
            address: address
        });
    }
}
