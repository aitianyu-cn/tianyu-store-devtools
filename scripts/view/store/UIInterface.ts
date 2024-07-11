/** @format */

import { ITianyuStoreInterface } from "@aitianyu.cn/tianyu-store";
import { CreateDevtoolsUIStateAction, DestroyDevtoolsUIStateAction } from "./action/UILifeManagementAction";
import { IDevtoolsUIState } from "./types/State";
import { getCurrentSelection } from "./selector/UISelector";
import { changePageSelectionAction } from "./action/UIActions";

export const UIInterface = {
    core: {
        creator: CreateDevtoolsUIStateAction,
        destroy: DestroyDevtoolsUIStateAction,
    },

    actions: {
        changeSelection: changePageSelectionAction,
    },

    selector: {
        selection: getCurrentSelection,
    },
};

UIInterface as ITianyuStoreInterface<IDevtoolsUIState>;
