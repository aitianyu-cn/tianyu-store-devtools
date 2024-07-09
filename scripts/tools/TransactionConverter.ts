/** @format */

import {
    TransactionOperationRecord,
    IInstanceAction,
    IInstanceSelector,
    TransactionErrorRecord,
} from "@aitianyu.cn/tianyu-store";
import { IStoreAction, IStoreErrors, IStoreRecord, IStoreSelector } from "scripts/common/Interface";
import { parseJsonString } from "./ObjectTool";

export function convertStoreActions(action: TransactionOperationRecord<IInstanceAction>): IStoreRecord<IStoreAction> {
    const stateActions: IStoreRecord<IStoreAction> = {
        id: action.id,
        operations: [],
        time: action.time.getTime(),
    };
    for (const actionItem of action.operations) {
        const newStoreAction: IStoreAction = {
            id: actionItem.id,
            action: actionItem.action,
            storeType: actionItem.storeType,
            instanceId: actionItem.instanceId.toString(),
            parameter: parseJsonString(actionItem.params),
            actionType: actionItem.actionType,
        };
        stateActions.operations.push(newStoreAction);
    }

    return stateActions;
}

export function convertStoreSelectors(
    selector: TransactionOperationRecord<IInstanceSelector<any>>,
): IStoreRecord<IStoreSelector> {
    const stateSelectors: IStoreRecord<IStoreSelector> = {
        id: selector.id,
        operations: [],
        time: selector.time.getTime(),
    };
    for (const selectorItem of selector.operations) {
        const newStoreSelector: IStoreSelector = {
            id: selectorItem.id,
            selector: selectorItem.selector,
            storeType: selectorItem.storeType,
            instanceId: selectorItem.instanceId.toString(),
            params: parseJsonString(selectorItem.params),
        };
        stateSelectors.operations.push(newStoreSelector);
    }

    return stateSelectors;
}

export function convertStoreError(error: TransactionErrorRecord): IStoreErrors {
    return {
        type: error.type,
        message: error.message,
        time: error.time.getTime(),
    };
}
