/** @format */

import {
    TransactionOperationRecord,
    IInstanceAction,
    IInstanceSelector,
    TransactionErrorRecord,
    IterableType,
} from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "scripts/common/Constant";
import { IStoreEntries } from "scripts/common/Interface";
import { sendMessage } from "webext-bridge/devtools";
import { setNamespace } from "webext-bridge/window";

setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

export class MessageSender {
    public static async getStores(): Promise<IStoreEntries[]> {
        return sendMessage("get-stores", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getDispatchedActions(): Promise<TransactionOperationRecord<IInstanceAction>[]> {
        return sendMessage("get-current-dispatched-actions", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getExecutedSelectors(): Promise<TransactionOperationRecord<IInstanceSelector<any>>[]> {
        return sendMessage("get-current-selectors", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getStoreErrors(): Promise<TransactionErrorRecord[]> {
        return sendMessage("get-current-errors", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getStoreState(): Promise<MapOfType<IterableType>> {
        return sendMessage("get-current-state", undefined, "window").then((value) => {
            return value;
        });
    }
}
