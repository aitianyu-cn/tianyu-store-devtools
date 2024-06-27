/** @format */

import { IterableType } from "@aitianyu.cn/tianyu-store";

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

export interface IDevtoolsDataState extends IterableType {}
