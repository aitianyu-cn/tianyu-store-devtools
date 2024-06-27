/** @format */

import { ITianyuStoreInterface } from "@aitianyu.cn/tianyu-store";
import { IDevtoolsUIState } from "./types/State";
import { CreateDevtoolsDataStateAction, DestroyDevtoolsDataStateAction } from "./action/DataLifeManagementAction";

export const DataInterface = {
    core: {
        creator: CreateDevtoolsDataStateAction,
        destroy: DestroyDevtoolsDataStateAction,
    },
};

DataInterface as ITianyuStoreInterface<IDevtoolsUIState>;
