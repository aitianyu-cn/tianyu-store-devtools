/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsDataCurrentState, IDevtoolsDataState } from "../types/State";
import { IStoreAction, IStoreEntries, IStoreErrors, IStoreRecord, IStoreSelector } from "scripts/common/Interface";
import { getBoolean } from "@aitianyu.cn/types";

export const getStores = SelectorFactor.makeSelector<IDevtoolsDataState, IStoreEntries[]>(function (state) {
    return state.stores;
});

export const isCurrentValid = SelectorFactor.makeSelector<IDevtoolsDataState, boolean>(function (state) {
    return getBoolean(state.current);
});

export const getCurrentInfo = SelectorFactor.makeSelector<IDevtoolsDataState, IDevtoolsDataCurrentState | undefined>(
    function (state) {
        return state.current;
    },
);

export const _readCurrentStore = SelectorFactor.makeConstantSelector<string, IDevtoolsDataCurrentState | undefined>(
    function (_state, data) {
        return data?.store || "";
    },
);
export const _readCurrentState = SelectorFactor.makeConstantSelector<any, IDevtoolsDataCurrentState | undefined>(
    function (_state, data) {
        return data?.state || {};
    },
);
export const _readCurrentActions = SelectorFactor.makeConstantSelector<
    IStoreRecord<IStoreAction>[],
    IDevtoolsDataCurrentState | undefined
>(function (_state, data) {
    return data?.actions || [];
});
export const _readCurrentSelectors = SelectorFactor.makeConstantSelector<
    IStoreRecord<IStoreSelector>[],
    IDevtoolsDataCurrentState | undefined
>(function (_state, data) {
    return data?.selectors || [];
});
export const _readCurrentErrors = SelectorFactor.makeConstantSelector<
    IStoreErrors[],
    IDevtoolsDataCurrentState | undefined
>(function (_state, data) {
    return data?.errors || [];
});

export const getCurrentStore = SelectorFactor.makeRestrictSelector(getCurrentInfo, _readCurrentStore);
export const getCurrentState = SelectorFactor.makeRestrictSelector(getCurrentInfo, _readCurrentState);
export const getCurrentActions = SelectorFactor.makeRestrictSelector(getCurrentInfo, _readCurrentActions);
export const getCurrentSelectors = SelectorFactor.makeRestrictSelector(getCurrentInfo, _readCurrentSelectors);
export const getCurrentErrors = SelectorFactor.makeRestrictSelector(getCurrentInfo, _readCurrentErrors);
