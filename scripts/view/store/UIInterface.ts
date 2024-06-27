/** @format */

import { ITianyuStoreInterface } from "@aitianyu.cn/tianyu-store";
import { CreateDevtoolsUIStateAction, DestroyDevtoolsUIStateAction } from "./action/UILifeManagementAction";
import { IDevtoolsUIState } from "./types/State";

export const UIInterface = {
    core: {
        creator: CreateDevtoolsUIStateAction,
        destroy: DestroyDevtoolsUIStateAction,
    },
};

UIInterface as ITianyuStoreInterface<IDevtoolsUIState>;
