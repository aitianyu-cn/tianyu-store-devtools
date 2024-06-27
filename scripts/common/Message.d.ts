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
import { IStoreEntries } from "./Interface";

declare module "webext-bridge" {
    export interface ProtocolMap {
        "page-state-change": boolean;

        "get-stores": ProtocolWithReturn<void, IStoreEntries[]>;

        "get-current-dispatched-actions": ProtocolWithReturn<void, TransactionOperationRecord<IInstanceAction>[]>;
        "get-current-selectors": ProtocolWithReturn<void, TransactionOperationRecord<IInstanceSelector<any>>[]>;
        "get-current-errors": ProtocolWithReturn<void, TransactionErrorRecord[]>;
        "get-current-state": ProtocolWithReturn<void, MapOfType<IterableType>>;

        "on-store-registery-changed": IStoreEntries[];
        "on-store-current-action-dispatched": TransactionOperationRecord<IInstanceAction>;
        "on-store-current-selector-executed": TransactionOperationRecord<IInstanceSelector<any>>;
        "on-store-current-error-occurs": TransactionErrorRecord;
        "on-store-current-state-changed": MapOfType<IterableType>;
    }
}
