/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { DEFAULT_APP_OPERATE_SELECTION, IDevtoolsUIState } from "../types/State";

export const CreateDevtoolsUIStateAction = ActionFactor.makeCreateStoreAction<IDevtoolsUIState>().withReducer(function (
    _state,
) {
    return {
        current: DEFAULT_APP_OPERATE_SELECTION,
    };
});

export const DestroyDevtoolsUIStateAction = ActionFactor.makeDestroyStoreAction();
