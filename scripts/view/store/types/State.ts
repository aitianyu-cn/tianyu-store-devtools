/** @format */

import { ActionType, IInstanceAction, IterableType } from "@aitianyu.cn/tianyu-store";
import { IStoreAction, IStoreEntries, IStoreErrors, IStoreRecord, IStoreSelector } from "scripts/common/Interface";

export enum AppOperationSelection {
    STATE,
    ACTION,
    SELECTOR,
    ERROR,
}

export const DEFAULT_APP_OPERATE_SELECTION = AppOperationSelection.ACTION;

export interface IDevtoolsUIState extends IterableType {
    current: AppOperationSelection;
}

export interface IDevtoolsDataCurrentState extends IterableType {
    store: string;
    state: any;
    actions: IStoreRecord<IStoreAction>[];
    selectors: IStoreRecord<IStoreSelector>[];
    errors: IStoreErrors[];
}

export interface IDevtoolsDataState extends IterableType {
    stores: IStoreEntries[];
    current?: IDevtoolsDataCurrentState;
}
