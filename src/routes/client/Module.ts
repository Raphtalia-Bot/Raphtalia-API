import { Router, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import type Request from "../../util/types/Request.ts";
import Module from "../../models/Module.ts";

const router = Router();

router.get("/", async function(req: Request, res): Promise<Response> {
    return res.setStatus(200).json({ modules: await Module.getModules() });
})

router.get("/:moduleId", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    const { id } = req.user;
    const moduleId = req.params.moduleId;
    return res.setStatus(200).json(await Module.getModule(moduleId, id));
});

router.post("/", async function (req: Request, res): Promise<Response> {
    // @ts-ignore
    const { id } = req.user;
    const { name, description, address } = req.body;
    if(/(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63}$)|^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]):[0-9]+$/.test(address)) {
        if((await fetch(address)).status === 200) {
            return res.setStatus(201).json(await Module.createModule(name, description, id, address));
        }
    }
    return res.sendStatus(400);
});

export default router;