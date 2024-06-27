/** @format */

import { SelectorFactor } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsUIState } from "../types/State";

export const getCurrentSelection = SelectorFactor.makeSelector(function (state: IDevtoolsUIState) {
    return state.current;
});
