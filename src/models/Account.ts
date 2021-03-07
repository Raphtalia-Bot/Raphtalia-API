import {DataTypes, Model} from 'https://deno.land/x/denodb@v1.0.23/mod.ts';

export class Account extends Model {
    static table = "accounts";
    static fields = {
        _id: {
            primaryKey: true,
            type: DataTypes.STRING
        },
        name: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        language: DataTypes.STRING,
        birthdate: DataTypes.INTEGER,
        notifications: DataTypes.BOOLEAN,
        developer: DataTypes.BOOLEAN,
    };
    static defaults = {
        developer: false,
        notifications: false,
        birthdate: 0,
        language: "en"
    };
}

export default new class {
    async existsAccount(id: string): Promise<boolean> {
        return Boolean(await this.getAccount(id));
    }
    async createAccount(id: string, username: string): Promise<Account> {
        return await Account.create({_id: id, name: username, username});
    }
    async deleteAccount(id: string): Promise<Account | Account[]> {
        return await Account.deleteById(id);
    }
    async editAccount(id: string, changeKey: string, changeValue: string | boolean | number): Promise<Account | undefined> {
        const account: Account = (await Account.where('_id', id).first());
        if(account["_id"] == id) {
            if(changeKey !== "_id") {
                account[changeKey] = changeValue;
                await account.update();
            }
            return account;
        }
    }
    async getAccount(id: string): Promise<Account> {
        return await Account.find(id);
    }
}
