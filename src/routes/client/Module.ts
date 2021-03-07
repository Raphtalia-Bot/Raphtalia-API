import { Router, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import type Request from "../../util/types/Request.ts";
import Module from "../../models/Module.ts";

const router = Router();

router.get("/", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    return res.json(await Module.getModule(req.module.id));
});

router.put("/", async function (req, res): Promise<Response> {
    const { name, description, owner } = req.body;
    return res.json(await Module.createModule(name, description, owner, "127.0.0.1:24495"));
});

export default router;
