/** @format */

import { IDifferences, IterableType } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { IStoreAction, IStoreEntries, IStoreErrors, IStoreRecord, IStoreSelector } from "scripts/common/Interface";
import { sendMessage } from "webext-bridge/devtools";

export class MessageSender {
    public static async setMoniterStore(storeName: string): Promise<void> {
        return sendMessage("set-store-monitor", storeName, "window");
    }

    public static async setPageState(state: boolean): Promise<void> {
        return sendMessage("page-state-change", state, "window");
    }

    public static async getStores(): Promise<IStoreEntries[]> {
        return sendMessage("get-stores", undefined, "window")
            .then((value) => {
                return value;
            })
            .catch((e) => {
                console.log("ERROR: " + e);
                return [];
            });
    }

    public static async getDispatchedActions(): Promise<IStoreRecord<IStoreAction>[]> {
        return sendMessage("get-current-dispatched-actions", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getExecutedSelectors(): Promise<IStoreRecord<IStoreSelector>[]> {
        return sendMessage("get-current-selectors", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getStoreErrors(): Promise<IStoreErrors[]> {
        return sendMessage("get-current-errors", undefined, "window").then((value) => {
            return value;
        });
    }

    public static async getStoreState(storeName?: string): Promise<MapOfType<IterableType>> {
        return sendMessage("get-current-state", storeName, "window").then((value) => {
            return value;
        });
    }

    public static async getHistory(): Promise<{
        histroy: IDifferences[];
        index: number;
    }> {
        return sendMessage("get-history", undefined, "window").then((value) => {
            return value;
        });
    }
}
