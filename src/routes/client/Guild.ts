import { Router, Response } from "https://x.nest.land/opine@1.1.0/mod.ts";
import type Request from "../../util/types/Request.ts";

const router = Router();

type EventsList = {

}

type CommandsList = {

}

type GuildModule = {
    id: string,
    enabledEvents: EventsList,
    enabledCommands: CommandsList,
    storageUsageKB: number,
    private: boolean
}

type Guild = {
    id: string,
    admins: string[],
    modules: GuildModule[]
}

export default router;
