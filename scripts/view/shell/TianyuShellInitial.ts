/** @format */

/**@format */

import { ITianyuShellInitial } from "@aitianyu.cn/tianyu-shell";

export const TianyuShellConfigure: ITianyuShellInitial = {
    core: {
        runtime: {
            console: true,
        },
        environment: "development",
        version: "0.0.0.1",
        plugin: {
            globalize: true,
        },
    },
    ui: {
        core: {
            support: true,
        },
    },
};
