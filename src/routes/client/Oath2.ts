import { Router, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import { create, getNumericDate } from "https://x.nest.land/djwt@0.1.7/mod.ts";
import type Request from "../../util/types/Request.ts";
import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import Account from "../../models/Account.ts";

const router = Router();

// @ts-ignore
router.get("/", async function(req: Request, res: Response): Promise<void> {
    if(!Boolean(req.query.code)) res.sendStatus(404);
    // @ts-ignore
    const data = new URLSearchParams({"client_id": Deno.env.get("RAPHTALIA_CLIENT_ID"), "client_secret": Deno.env.get("RAPHTALIA_CLIENT_SECRET"), "grant_type": "authorization_code", "code": req.query.code, "redirect_uri": Deno.env.get("RAPHTALIA_URL"), "scope": "identify email guilds",});
    const tokenResponse = await (await fetch("https://discord.com/api/oauth2/token", {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}, body: data})).json();
    const userData = await (await fetch("https://discord.com/api/users/@me", {headers: {'Authorization': `Bearer ${tokenResponse.access_token}`}})).json();
    if(!(await Account.existsAccount(userData.id))) await Account.createAccount(userData.id, userData.username);
    // @ts-ignore
    return res.clearCookie("Raphtalia-Authorization").cookie("Raphtalia-Authorization", await create({alg: "HS512", typ: "JWT"}, {exp: getNumericDate(3600), userId: userData.id.toString(), access_token: tokenResponse.access_token, refresh_token: tokenResponse.refresh_token}, Deno.env.get("JWT_SECRET")), {httpOnly: true, secure: true, maxAge: getNumericDate(3600)}).redirect(301, "/");
});

export default router;
