/** @format */

import {
    IInstanceAction,
    IInstanceSelector,
    IterableType,
    TransactionErrorRecord,
    TransactionOperationRecord,
} from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";
import { ProtocolWithReturn } from "webext-bridge";
import { IStoreAction, IStoreEntries, IStoreErrors, IStoreRecord, IStoreSelector } from "./Interface";

declare module "webext-bridge" {
    export interface ProtocolMap {
        "page-state-change": boolean;

        "get-stores": ProtocolWithReturn<void, IStoreEntries[]>;

        "get-current-dispatched-actions": ProtocolWithReturn<void, IStoreRecord<IStoreAction>[]>;
        "get-current-selectors": ProtocolWithReturn<void, IStoreRecord<IStoreSelector>[]>;
        "get-current-errors": ProtocolWithReturn<void, IStoreErrors[]>;
        "get-current-state": ProtocolWithReturn<void, MapOfType<IterableType>>;

        "on-store-registery-changed": IStoreEntries[];
        "on-store-current-action-dispatched": IStoreRecord<IStoreAction>;
        "on-store-current-selector-executed": IStoreRecord<IStoreSelector>;
        "on-store-current-error-occurs": IStoreErrors;
        "on-store-current-state-changed": MapOfType<IterableType>;
    }
}
