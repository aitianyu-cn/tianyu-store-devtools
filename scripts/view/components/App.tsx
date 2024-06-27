/** @format */

import React from "react";

enum AppSelector {
    STATE,
    ACTION,
    SELECTOR,
    ERROR,
}

export class App extends React.Component<{}, {}> {
    private selection: AppSelector;

    public constructor(props = {}) {
        super(props);

        this.selection = AppSelector.ACTION;
    }

    public render(): React.ReactNode {
        return (
            <div>
                <div id="store-list"></div>
                <div id="store-display-content">
                    <div id="store-display-selector">
                        {/* this part to select action list, store state list, error list, seletor list */}
                    </div>
                    <div id="store-display-data-area"></div>
                </div>
            </div>
        );
    }
}
