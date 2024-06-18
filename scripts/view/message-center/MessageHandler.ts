/** @format */
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "../../common/Constant";
import { IStoreEntries } from "../../common/Interface";
import { sendMessage } from "webext-bridge/devtools";
import { setNamespace } from "webext-bridge/window";

setNamespace(TIANYU_STORE_DEVTOOLS_NAMESPACE);

export async function getStores(): Promise<IStoreEntries[]> {
    return sendMessage("get-stores", undefined, "window").then((value) => {
        return value;
    });
}
