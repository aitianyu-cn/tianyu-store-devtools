/** @format */

import { onMessage, sendMessage, setNamespace } from "webext-bridge/window";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "./common/Constant";
import {
    Devtools,
    IDifferences,
    IInstanceAction,
    IInstanceSelector,
    IterableType,
    TransactionErrorRecord,
    TransactionOperationRecord,
} from "@aitianyu.cn/tianyu-store";
import { IStoreDevAPI } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { IStoreEntries } from "./common/Interface";
import { convertStoreActions, convertStoreError, convertStoreSelectors } from "./tools/TransactionConverter";

setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

interface IStoreItem {
    store: IStoreDevAPI;
    title: string;
    name: string;
}

class StoreManager implements Devtools.DevToolsAPI {
    private storeMap: Map<string, IStoreItem>;

    private currentStore: string;
    private pageInited: boolean;

    public constructor() {
        this.storeMap = new Map<string, IStoreItem>();

        this.currentStore = "";
        this.pageInited = false;
    }

    register(store: IStoreDevAPI): void {
        const id = store.id;
        if (!this.storeMap.has(id)) {
            const title = document.title || id;
            const name = store.name;
            this.storeMap.set(id, { store, title, name });

            this.onStoreRegisteryChanged();
        }
    }

    unregister(store: IStoreDevAPI): void {
        if (this.storeMap.delete(store.id)) {
            this.onStoreRegisteryChanged();
        }

        if (store.id === this.currentStore) {
            this.currentStore = "";
        }
    }

    public setInited(init: boolean): void {
        this.pageInited = init;
    }

    public setCurrentMonitorStore(storeId: string): void {
        if (this.currentStore === storeId) {
            return;
        }

        this.unlistenStoreTransaction();

        this.currentStore = storeId;
        this.listenStoreTransaction();
    }
    public getActions(): TransactionOperationRecord<IInstanceAction>[] {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return [];
        }

        return store.store.getAllDispatchs();
    }
    public getSelectors(): TransactionOperationRecord<IInstanceSelector<any>>[] {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return [];
        }

        return store.store.getAllSelectors();
    }
    public getErrors(): TransactionErrorRecord[] {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return [];
        }

        return store.store.getAllErrors();
    }
    public getStoreState(storeName?: string): MapOfType<IterableType> {
        const store = storeName ? this.storeMap.get(storeName) : this.storeMap.get(this.currentStore);
        if (!store) {
            return {};
        }

        // const storeCombineState = store.store.getState();
        // const storeState: MapOfType<IterableType> = {};
        // for (const entityId of Object.keys(storeCombineState)) {
        //     storeState[entityId] = storeCombineState[entityId][STORE_STATE_INSTANCE];
        // }

        return store.store.getState();
    }
    public getHistory(): {
        histroy: IDifferences[];
        index: number;
    } {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return { histroy: [], index: -1 };
        }

        return store.store.getHistories();
    }
    public getAllStores(): IStoreEntries[] {
        const storeList: IStoreEntries[] = [];
        for (const storeItem of this.storeMap) {
            const item: IStoreEntries = {
                id: storeItem[0],
                title: storeItem[1].title,
                name: storeItem[1].name,
            };
            storeList.push(item);
        }

        return storeList;
    }

    private listenStoreTransaction(): void {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return;
        }

        store.store.setOnDispatch(this.onAction.bind(this));
        store.store.setOnSelector(this.onSelector.bind(this));
        store.store.setOnError(this.onError.bind(this));
        store.store.setOnChangeApplied(this.onStateChange.bind(this));
    }
    private unlistenStoreTransaction(): void {
        const store = this.storeMap.get(this.currentStore);
        if (!store) {
            return;
        }

        store.store.setOnDispatch(undefined);
        store.store.setOnSelector(undefined);
        store.store.setOnError(undefined);
        store.store.setOnChangeApplied(undefined);
    }

    private onStoreRegisteryChanged(): void {
        if (!this.pageInited) {
            return;
        }

        sendMessage("on-store-registery-changed", this.getAllStores(), "window").catch((reason) => {
            //
        });
    }
    private onAction(action: TransactionOperationRecord<IInstanceAction>): void {
        if (!this.pageInited) {
            return;
        }

        sendMessage("on-store-current-action-dispatched", convertStoreActions(action), "window").catch((reason) => {
            //
        });
    }
    private onSelector(selector: TransactionOperationRecord<IInstanceSelector<any>>): void {
        if (!this.pageInited) {
            return;
        }
        sendMessage("on-store-current-selector-executed", convertStoreSelectors(selector), "window").catch((reason) => {
            //
        });
    }
    private onError(error: TransactionErrorRecord): void {
        if (!this.pageInited) {
            return;
        }

        sendMessage("on-store-current-error-occurs", convertStoreError(error), "window").catch((reason) => {
            //
        });
    }
    private onStateChange(): void {
        if (!this.pageInited) {
            return;
        }

        sendMessage("on-store-current-state-changed", this.getStoreState(), "window").catch((reason) => {
            //
        });
    }
}

const storeManager = new StoreManager();
window.__TIANYU_STORE_DEVTOOLS__ = storeManager;

onMessage("page-state-change", async (data) => {
    storeManager.setInited(data.data);
});

onMessage("set-store-monitor", async (data) => {
    storeManager.setCurrentMonitorStore(data.data);
});

onMessage("get-stores", async () => {
    return storeManager.getAllStores();
});

onMessage("get-current-dispatched-actions", async () => {
    return storeManager.getActions().map((value) => convertStoreActions(value));
});

onMessage("get-current-selectors", async () => {
    return storeManager.getSelectors().map((value) => convertStoreSelectors(value));
});

onMessage("get-current-errors", async () => {
    return storeManager.getErrors().map((value) => convertStoreError(value));
});

onMessage("get-current-state", async (data) => {
    return storeManager.getStoreState(data.data);
});

onMessage("get-history", async () => {
    return storeManager.getHistory();
});
