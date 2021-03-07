import { Database, MongoDBConnector } from 'https://deno.land/x/denodb/mod.ts';// app.ts
import "https://deno.land/x/dotenv@v2.0.0/load.ts";

const database = new Database({connector:
    new MongoDBConnector({
// @ts-ignore
        uri: Deno.env.get('MONGODB_URL'),
// @ts-ignore
        database: Deno.env.get('MONGODB_DATABASE')
    })
});

import { Module } from "../models/Module.ts";
import { Account } from "../models/Account.ts";
database.link([Module, Account]);
database.sync();