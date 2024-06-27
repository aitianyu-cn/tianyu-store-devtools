/** @format */
import {
    TransactionOperationRecord,
    IInstanceAction,
    IInstanceSelector,
    TransactionErrorRecord,
    IterableType,
} from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "../common/Constant";
import { IStoreEntries } from "../common/Interface";
import { sendMessage } from "webext-bridge/devtools";
import { setNamespace } from "webext-bridge/window";

setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

export async function getStores(): Promise<IStoreEntries[]> {
    return sendMessage("get-stores", undefined, "window").then((value) => {
        return value;
    });
}

export class MessageHandler {
    private init: boolean;

    public constructor() {
        this.init = false;
    }

    public async enable(): Promise<void> {
        this.init = true;
        await this.sendPageStateChange();
    }

    public async destroy(): Promise<void> {
        this.init = false;
        await this.sendPageStateChange();
    }

    private async sendPageStateChange(): Promise<void> {
        await sendMessage("page-state-change", this.init);
    }
}
