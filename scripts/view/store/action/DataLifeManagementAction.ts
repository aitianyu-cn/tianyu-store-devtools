/** @format */

import { ActionFactor } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsDataState } from "../types/State";

export const CreateDevtoolsDataStateAction = ActionFactor.makeCreateStoreAction<IDevtoolsDataState>().withReducer(
    function (_state) {
        return {};
    },
);

export const DestroyDevtoolsDataStateAction = ActionFactor.makeDestroyStoreAction();
