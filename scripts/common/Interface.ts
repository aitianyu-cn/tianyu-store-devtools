/** @format */

import { IStoreDevAPI } from "@aitianyu.cn/tianyu-store";
import { MapOfType } from "@aitianyu.cn/types";

export interface IStoreEntries {
    id: string;
    title: string;
    name: string;
    store: MapOfType<any>;
}
