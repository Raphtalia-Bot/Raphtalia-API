import { Router } from "https://x.nest.land/opine@1.1.0/mod.ts";

const router = Router();

import Account from "./Account.ts";
router.use("/account", Account);

import Module from "./Module.ts";
router.use("/module", Module);

import Oath2 from "./Oath2.ts";
router.use("/oath2", Oath2);

export default router;
