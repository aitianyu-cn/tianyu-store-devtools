/** @format */

import { ProtocolWithReturn } from "webext-bridge";
import { IStoreEntries } from "./Interface";

declare module "webext-bridge" {
    export interface ProtocolMap {
        "get-stores": ProtocolWithReturn<void, IStoreEntries[]>;
    }
}
