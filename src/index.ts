import { opine, json, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import Cookieware from "./middlewares/Cookieware.ts";
import "https://deno.land/x/dotenv@v2.0.0/load.ts";
const app = opine();

app.use(json());
app.use(Cookieware);

app.set("x-powered-by", "Raphtalia");

import Client from "./routes/client/index.ts";
import ClientAuth from "./middlewares/ClientAuth.ts";
app.use("/client", ClientAuth, Client);

import Module from "./routes/module/index.ts";
import ModuleAuth from "./middlewares/ModuleAuth.ts";
app.use("/module", ModuleAuth, Module);

app.get("/", async function(req, res): Promise<Response> {
    return await res.send({body: "Home"});
});

// @ts-ignore
app.listen(parseInt(Deno.env.get("PORT")), () => console.log(`Raphtalia API listening on port ${Deno.env.get("PORT")}!`));
