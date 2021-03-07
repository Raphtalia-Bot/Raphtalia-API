import type { NextFunction, Request, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import { verify } from "https://x.nest.land/djwt@0.1.7/mod.ts";
import "https://deno.land/x/dotenv@v2.0.0/load.ts";

export default async function(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    if(req.originalUrl.split("?")[0] === "/client/oath2" && req.method === "GET") return next();
    try {
        // @ts-ignore
        const authorization = await verify(req.cookies["Raphtalia-Authorization"], Deno.env.get('JWT_SECRET'), "HS512"); req["user"] = {
            id: authorization.userId,
            discord: {
                access_token: authorization.access_token,
                refresh_token: authorization.refresh_token
            }
        };
        return next();
    } catch (err) {
        return res.setStatus(401);
    }
}
