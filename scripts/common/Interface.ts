/** @format */

import { ActionType, IStoreDevAPI, IterableType, TransactionType } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";

export interface IStoreEntries extends IterableType {
    id: string;
    title: string;
    name: string;
}

export interface IStoreRecord<REC extends IterableType> extends IterableType {
    id: string;
    operations: REC[];
    time: number;
}

export interface IStoreAction extends IterableType {
    id: string;
    action: string;
    storeType: string;
    instanceId: string;
    parameter: string;
    actionType: ActionType;
}

export interface IStoreSelector extends IterableType {
    id: string;
    selector: string;
    storeType: string;
    instanceId: string;
    params: string;
}

export interface IStoreErrors extends IterableType {
    time: number;
    message: string;
    type: TransactionType;
}
