/** @format */

export {};
const container = document.getElementById("tianyu-store-devtools-container");
if (container) {
    import("./message-center/MessageHandler").then(({ getStores }) => {
        const storeData = getStores();
        storeData.then((value) => {
            const div = document.createElement("div");
            div.style.minHeight = "30px";
            div.style.minWidth = "100px";
            for (const item of value) {
                const idiv = document.createElement("div");
                idiv.innerText = `{
                id: ${item.id}
                name: ${item.name}
                title: ${item.title}
                store: ${item.store.getState()}
            }`;
                console.log(idiv.innerText);
                div.appendChild(idiv);
            }
            container.appendChild(div);
        });
    });
}

/**
 * "action": {
        "default_title": "Tianyu Store Devtools",
        "default_popup": "index.html"
    },
 */
