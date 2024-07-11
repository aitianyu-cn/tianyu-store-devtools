/** @format */

import { ITianyuStoreInterface } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsUIState } from "./types/State";
import { CreateDevtoolsDataStateAction, DestroyDevtoolsDataStateAction } from "./action/DataLifeManagementAction";
import * as DataSelector from "./selector/DataSelector";
import {
    clearMonitorStoreAction,
    startMonitorStoreAction,
    storeActionDispatchedAction,
    storeErrorOccurAction,
    storeRegisteryChangedAction,
    storeSelectorExecutedAction,
    storeStateChangeAction,
} from "./action/DataActions";

export const DataInterface = {
    core: {
        creator: CreateDevtoolsDataStateAction,
        destroy: DestroyDevtoolsDataStateAction,
    },

    selectors: {
        allStores: DataSelector.getStores,
        hasSelectedStore: DataSelector.isCurrentValid,

        current: {
            getInfo: DataSelector.getCurrentInfo,
            storeName: DataSelector.getCurrentStore,
            getState: DataSelector.getCurrentState,
            getActions: DataSelector.getCurrentActions,
            getSelectors: DataSelector.getCurrentSelectors,
            getErrors: DataSelector.getCurrentErrors,

            internal: {
                _readActions: DataSelector._readCurrentActions,
                _readState: DataSelector._readCurrentState,
                _readErrors: DataSelector._readCurrentErrors,
                _readSelectors: DataSelector._readCurrentSelectors,
                _readStore: DataSelector._readCurrentStore,
            },
        },
    },

    actions: {
        monitorStore: startMonitorStoreAction,
        clearMonitor: clearMonitorStoreAction,
        register: storeRegisteryChangedAction,

        store: {
            onDispatch: storeActionDispatchedAction,
            onSelector: storeSelectorExecutedAction,
            onError: storeErrorOccurAction,
            onStateChange: storeStateChangeAction,
        },
    },
};

DataInterface as ITianyuStoreInterface<IDevtoolsUIState>;
