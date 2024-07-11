/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsDataState } from "../types/State";
import { IStoreAction, IStoreEntries, IStoreErrors, IStoreRecord, IStoreSelector } from "scripts/common/Interface";
import { getCurrentStore } from "../selector/DataSelector";
import { ObjectHelper } from "@aitianyu.cn/types";

export const startMonitorStoreAction = ActionFactor.makeActionCreator<IDevtoolsDataState, string>()
    .withHandler(function* (action) {
        const currentSelection = yield* StoreUtils.Handler.doSelector(getCurrentStore(action.instanceId));
        if (currentSelection === action.params) {
            return null;
        }

        return action.params;
    })
    .withReducer(function (state, storeName) {
        if (!storeName) {
            return state;
        }
        return StoreUtils.State.getNewState(state, ["current"], {
            store: storeName,
            state: {},
            actions: [],
            selectors: [],
            error: [],
        });
    });

export const clearMonitorStoreAction = ActionFactor.makeActionCreator<IDevtoolsDataState>().withReducer(function (
    state,
) {
    return StoreUtils.State.getNewState(state, ["current"], undefined);
});

export const storeRegisteryChangedAction = ActionFactor.makeActionCreator<IDevtoolsDataState, IStoreEntries[]>()
    .withHandler(function* (action) {
        const currentSelection = yield* StoreUtils.Handler.doSelector(getCurrentStore(action.instanceId));
        const isCurrentValid = action.params.find((value) => value.id === currentSelection);

        return {
            stores: action.params,
            currentValid: isCurrentValid,
        };
    })
    .withReducer(function (state, data) {
        const newState = ObjectHelper.clone(state) as IDevtoolsDataState;
        newState.stores = data.stores;
        if (!data.currentValid) {
            newState.current = undefined;
        }
        return newState;
    });

export const storeActionDispatchedAction = ActionFactor.makeActionCreator<
    IDevtoolsDataState,
    IStoreRecord<IStoreAction>
>().withReducer(function (state, action) {
    return StoreUtils.State.getNewState(state, ["current", "actions"], [...(state.current?.actions || []), action]);
});

export const storeSelectorExecutedAction = ActionFactor.makeActionCreator<
    IDevtoolsDataState,
    IStoreRecord<IStoreSelector>
>().withReducer(function (state, select) {
    return StoreUtils.State.getNewState(state, ["current", "selectors"], [...(state.current?.selectors || []), select]);
});

export const storeErrorOccurAction = ActionFactor.makeActionCreator<IDevtoolsDataState, IStoreErrors>().withReducer(
    function (state, error) {
        return StoreUtils.State.getNewState(state, ["current", "errors"], [...(state.current?.errors || []), error]);
    },
);

export const storeStateChangeAction = ActionFactor.makeActionCreator<IDevtoolsDataState, any>().withReducer(function (
    state,
    storeState,
) {
    return StoreUtils.State.getNewState(state, ["current", "state"], storeState);
});
