/** @format */

import { allowWindowMessaging } from "webext-bridge/content-script";
import { TIANYU_STORE_DEVTOOLS_NAMESPACE } from "./common/Constant";

allowWindowMessaging(TIANYU_STORE_DEVTOOLS_NAMESPACE);
