import { opine, json, urlencoded, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import Cookieware from "./middlewares/Cookieware.ts";
const app = opine();

app.use(json());
app.use(urlencoded());
app.use(Cookieware);

import Client from "./routes/client/index.ts";
import ClientAuth from "./middlewares/ClientAuth.ts";
app.use("/client", ClientAuth, Client);

import Module from "./routes/module/index.ts";
import ModuleAuth from "./middlewares/ModuleAuth.ts";
app.use("/module", ModuleAuth, Module);

app.get("/", async function(req, res): Promise<Response> {
    return await res.send({body: "Home"});
});

app.listen(8000);
console.log("Raphtalia API listening on port 8000!");
