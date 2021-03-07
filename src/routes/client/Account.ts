import { Router, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import type Request from "../../util/types/Request.ts";
import Account from "../../models/Account.ts";

const router = Router();

router.get("/", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    return res.send(await Account.getAccount(req.user.id));
});

router.patch("/", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    for (const key of Object.keys(req.body)) {await Account.editAccount(req.user.id, key, req.body[key])}
    return res.sendStatus(204);
});

router.delete("/", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    await Account.deleteAccount(req.user.id);
    return res.sendStatus(204);
});

export default router;
