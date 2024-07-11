/** @format */
import { IStore, InstanceId, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "../common/Constant";
import { onMessage, setNamespace } from "webext-bridge/window";
import { MessageSender } from "./MessageSender";
import { DataInterface } from "scripts/view/store/DataInterface";

// setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

export class MessageHandler {
    private init: boolean;

    private store: IStore;
    private instanceId: InstanceId;

    public constructor(store: IStore, instanceId: InstanceId) {
        this.init = false;

        this.store = store;
        this.instanceId = instanceId;

        this.onMessageReceived();
    }

    public async enable(): Promise<void> {
        this.init = true;
        await this.sendPageStateChange();
        await this.initStoreInfos();
    }

    public async destroy(): Promise<void> {
        this.init = false;
        await this.sendPageStateChange();
    }

    private async sendPageStateChange(): Promise<void> {
        await MessageSender.setPageState(this.init);
    }

    private onMessageReceived(): void {
        onMessage("on-store-registery-changed", (message) => {
            this.store.dispatchForView(
                StoreUtils.createBatchAction([DataInterface.actions.register(this.instanceId, message.data)]),
            );
        });

        onMessage("on-store-current-action-dispatched", (message) => {
            this.store.dispatchForView(
                StoreUtils.createBatchAction([DataInterface.actions.store.onDispatch(this.instanceId, message.data)]),
            );
        });

        onMessage("on-store-current-selector-executed", (message) => {
            this.store.dispatchForView(
                StoreUtils.createBatchAction([DataInterface.actions.store.onSelector(this.instanceId, message.data)]),
            );
        });

        onMessage("on-store-current-error-occurs", (message) => {
            this.store.dispatchForView(
                StoreUtils.createBatchAction([DataInterface.actions.store.onError(this.instanceId, message.data)]),
            );
        });

        onMessage("on-store-current-state-changed", (message) => {
            this.store.dispatchForView(
                StoreUtils.createBatchAction([
                    DataInterface.actions.store.onStateChange(this.instanceId, message.data),
                ]),
            );
        });
    }

    private async initStoreInfos(): Promise<void> {
        const storeInfos = await MessageSender.getStores();
        await this.store.dispatch(DataInterface.actions.register(this.instanceId, storeInfos));
    }
}
