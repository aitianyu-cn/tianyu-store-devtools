/** @format */

import React from "react";
import { TIANYU_STORE_DEVTOOLS_TYPE_DATA, TIANYU_STORE_DEVTOOLS_TYPE_UI } from "./store/types/Constant";
import { StoreUtils } from "@aitianyu.cn/tianyu-store";

export async function buildApp(): Promise<React.ReactNode> {
    const { loading } = await import("./shell/TianyuShellLoader");
    const TianyuShell = await loading();

    const { UIInterface } = await import("./store/UIInterface");
    const { DataInterface } = await import("./store/DataInterface");
    const { instanceIdForData, instanceIdForUI } = await import("./store/utils/InstanceHelper");

    const store = TianyuShell.TianyuShellStore.getStore();
    store.registerInterface({
        [TIANYU_STORE_DEVTOOLS_TYPE_DATA]: DataInterface,
        [TIANYU_STORE_DEVTOOLS_TYPE_UI]: UIInterface,
    });

    await store.dispatch(
        StoreUtils.createBatchAction([
            DataInterface.core.creator(instanceIdForData()),
            UIInterface.core.creator(instanceIdForUI()),
        ]),
    );

    const { App } = await import("./components/App");
    return <App store={store} />;
}
