import {DataTypes, Model} from 'https://deno.land/x/denodb@v1.0.23/mod.ts';

export class Guild extends Model {
    static table = "guilds";
    static fields = {
        _id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        admins: DataTypes.STRING, // "userid,userid,userid"
        modules: DataTypes.STRING // "moduleHex,moduleHex,moduleHex"
    };
    static defaults: {
        modules: ""
    }
}

function hex2a(hexx: string) {
    let hex = hexx;
    let str = '';
    for (let i = 0; (i < hex.length && hex.substr(i, 2) !== '00'); i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function removeItemOnce(arr: Object[], value: Object) {
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

export default new class {
    async getGuild(id: string): Promise<Guild> {
        const DBGuild = await Guild.find(id);
        // @ts-ignore
        DBGuild.admins = DBGuild.admins.split(",");
        // @ts-ignore
        DBGuild.modules = DBGuild.modules.split(",");
        const hexModules = [];
        // @ts-ignore
        for (let hexModule of DBGuild.modules.split(",")) {
            hexModules.push(JSON.parse(hex2a(hexModule)));
        }
        // @ts-ignore
        DBGuild.modules = hexModules;
        return DBGuild;
    }
    async createGuild(guildId: string, userId: string): Promise<Guild> {
        return await Guild.create({_id: guildId, admins: userId});
    }
    async addAdmin(id: string, userId: string): Promise<void> {
        const DBGuild = await Guild.find(id);
        // @ts-ignore
        const admins = DBGuild.admins.split(",");
        admins.push(userId);
        DBGuild.admins = admins.toString();
    }
    async removeAdmin(id: string, userId: string): Promise<void> {
        const DBGuild = await Guild.find(id);
        // @ts-ignore
        const admins = DBGuild.admins.split(",");
        removeItemOnce(admins, userId);
        DBGuild.admins = admins.toString();
        DBGuild.update();
    }

}