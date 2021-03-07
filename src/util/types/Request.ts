import { Request as Req } from "https://x.nest.land/opine@1.1.0/mod.ts";

export default interface Request extends Req {
    user?: {
        id: string,
        discord: {
            access_token: string,
            refresh_token: string
        }
    },
    module?: {
        id: string,
        name: string,
        description: string,
        owner: string
    }
}