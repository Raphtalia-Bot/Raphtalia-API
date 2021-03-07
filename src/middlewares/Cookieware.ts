export default async function(req: any, res: any, next: any) {
    if(req.headers.has("cookie")) {
        req["cookies"] = {};
        for await (let cookie of req.headers.get("cookie").split("; ")) {
            let dualCookie = await cookie.split("=");
            req.cookies[dualCookie[0]] = dualCookie[1];
        }
    }
    return next();
}
