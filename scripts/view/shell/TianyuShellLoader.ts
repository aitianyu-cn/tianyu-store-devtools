/**@format */

import { loadI18n } from "@aitianyu.cn/tianyu-shell/infra";
import { ITianyuShellInitial, initialTianyuShellAsync } from "@aitianyu.cn/tianyu-shell";
import { TianyuShellConfigure } from "./TianyuShellInitial";

export async function loading() {
    await loadI18n();
    await initialTianyuShellAsync(TianyuShellConfigure);

    const core = await import(/*webpackChunkName: "tianyu-shell/core" */ "@aitianyu.cn/tianyu-shell/core");
    await core.waitLoading();

    return core;
}
