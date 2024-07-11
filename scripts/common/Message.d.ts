/** @format */

import {
    IDifferences,
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
        "set-store-monitor": string;

        "get-stores": ProtocolWithReturn<void, IStoreEntries[]>;

        "get-current-dispatched-actions": ProtocolWithReturn<void, IStoreRecord<IStoreAction>[]>;
        "get-current-selectors": ProtocolWithReturn<void, IStoreRecord<IStoreSelector>[]>;
        "get-current-errors": ProtocolWithReturn<void, IStoreErrors[]>;
        "get-current-state": ProtocolWithReturn<string | undefined, MapOfType<IterableType>>;
        "get-history": ProtocolWithReturn<
            void,
            {
                histroy: IDifferences[];
                index: number;
            }
        >;

        "on-store-registery-changed": IStoreEntries[];
        "on-store-current-action-dispatched": IStoreRecord<IStoreAction>;
        "on-store-current-selector-executed": IStoreRecord<IStoreSelector>;
        "on-store-current-error-occurs": IStoreErrors;
        "on-store-current-state-changed": MapOfType<IterableType>;
    }
}
