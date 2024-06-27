/** @format */

import { createRoot } from "react-dom/client";
import { buildApp } from "./app-builder";

const container = document.getElementById("tianyu-store-devtools-container");
if (container) {
    buildApp().then((application) => {
        const reactRoot = createRoot(container);
        reactRoot.render(application);
    });
}
