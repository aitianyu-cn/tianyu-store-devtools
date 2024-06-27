/** @format */

import { TianyuShellStore } from "@aitianyu.cn/tianyu-shell/core";
import { InstanceId, StoreHelper } from "@aitianyu.cn/tianyu-store";
import { TIANYU_STORE_DEVTOOLS_TYPE_DATA, TIANYU_STORE_DEVTOOLS_TYPE_UI } from "../types/Constant";

export function instanceIdForData(): InstanceId {
    return StoreHelper.generateInstanceId(
        TianyuShellStore.getNoHisSupportedIns(),
        TIANYU_STORE_DEVTOOLS_TYPE_DATA,
        "tianyu-store-devtools-data",
    );
}

export function instanceIdForUI(): InstanceId {
    return StoreHelper.generateInstanceId(
        TianyuShellStore.getNoHisSupportedIns(),
        TIANYU_STORE_DEVTOOLS_TYPE_UI,
        "tianyu-store-devtools-ui",
    );
}
