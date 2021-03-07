import { verify } from "https://x.nest.land/djwt@0.1.7/mod.ts";
import "https://deno.land/x/dotenv@v2.0.0/load.ts";

export default async function (req: any, res: any, next: any): Promise<any> {
    try {
        // @ts-ignore
        const access_token = await verify(req.headers.get("Authorization").split(" ")[1], Deno.env.get('JWT_SECRET'), "HS512");
        req.moduleId = access_token.moduleId;
        return next();
    } catch (err) {
        return res.setStatus(401);
    }
}
