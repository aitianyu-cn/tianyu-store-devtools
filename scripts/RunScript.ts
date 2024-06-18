/** @format */

import { onMessage, sendMessage, setNamespace } from "webext-bridge/window";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "./common/Constant";
import { Devtools } from "@aitianyu.cn/tianyu-store";
import { IStoreDevAPI } from "@aitianyu.cn/tianyu-store";
import { IStoreEntries } from "./common/Interface";

setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

interface IStoreItem {
    store: IStoreDevAPI;
    title: string;
    name: string;
}

class StoreManager implements Devtools.DevToolsAPI {
    private storeMap: Map<string, IStoreItem>;

    public constructor() {
        this.storeMap = new Map<string, IStoreItem>();
    }

    register(store: IStoreDevAPI): void {
        const id = store.id;
        if (!this.storeMap.has(id)) {
            const title = document.title || id;
            const name = store.name;
            this.storeMap.set(id, { store, title, name });
        }
    }
    unregister(store: IStoreDevAPI): void {
        this.storeMap.delete(store.id);
    }

    public getStores(): IStoreEntries[] {
        return [...this.storeMap.entries()].map((value) => ({
            id: value[0],
            title: value[1].title,
            name: value[1].name,
            store: value[1].store.getState(),
        }));
    }
}

const storeManager = new StoreManager();
window.__TIANYU_STORE_DEVTOOLS__ = storeManager;

onMessage("get-stores", async () => {
    return storeManager.getStores();
});
