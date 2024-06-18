/** @format */

import "../css/index.css";

export {};

const script = document.createElement("script");
script.type = "text/javascript";
script.src = chrome.runtime.getURL("scripts/RunScript.js");
script.onload = function () {
    (this as HTMLScriptElement).parentNode?.removeChild(this as HTMLScriptElement);
};
(document.head || document.documentElement).appendChild(script);
