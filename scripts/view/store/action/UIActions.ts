/** @format */

import { ActionFactor, StoreUtils } from "@aitianyu.cn/tianyu-store";
import { AppOperationSelection, IDevtoolsUIState } from "../types/State";

export const changePageSelectionAction = ActionFactor.makeActionCreator<
    IDevtoolsUIState,
    AppOperationSelection
>().withReducer(function (state, selection) {
    return StoreUtils.State.getNewState(state, ["current"], selection);
});
