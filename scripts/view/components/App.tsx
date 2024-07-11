/** @format */

import { IStore, ListenerFactor, Missing, Unsubscribe } from "@aitianyu.cn/tianyu-store";
import React from "react";
import { MessageHandler } from "scripts/message-center/MessageHandler";
import { instanceIdForData, instanceIdForUI } from "../store/utils/InstanceHelper";
import { AppOperationSelection } from "../store/types/State";
import { UIInterface } from "../store/UIInterface";
import { CallbackActionT } from "@aitianyu.cn/types";
import { DataInterface } from "../store/DataInterface";

function formatSelection(selection: AppOperationSelection) {
    switch (selection) {
        case AppOperationSelection.STATE:
            return "state";
        case AppOperationSelection.ACTION:
            return "action";
        case AppOperationSelection.SELECTOR:
            return "selector";
        case AppOperationSelection.ERROR:
            return "error";
    }
}

function getSelection(value: string) {
    switch (value) {
        case "action":
            return AppOperationSelection.ACTION;
        case "selector":
            return AppOperationSelection.SELECTOR;
        case "error":
            return AppOperationSelection.ERROR;
        case "state":
        default:
            return AppOperationSelection.STATE;
    }
}

function SelectBox(props: {
    currentSelection: AppOperationSelection;
    onChange: CallbackActionT<AppOperationSelection>;
}) {
    return (
        <select
            value={formatSelection(props.currentSelection)}
            onChange={(event) => {
                props.onChange(getSelection(event.target.selectedOptions[0].value));
            }}>
            <option key={"state"} value={"state"}>
                state
            </option>
            <option key={"action"} value={"action"}>
                action
            </option>
            <option key={"selector"} value={"selector"}>
                selector
            </option>
            <option key={"error"} value={"error"}>
                error
            </option>
        </select>
    );
}

export class App extends React.Component<{ store: IStore }, {}> {
    private selection: AppOperationSelection;

    private messageHandler: MessageHandler;
    private unsubscribePageSelectionChanged: Unsubscribe;

    public constructor(props: { store: IStore }) {
        super(props);

        this.unsubscribePageSelectionChanged = () => undefined;
        this.selection = AppOperationSelection.ACTION;
        this.messageHandler = new MessageHandler(props.store, instanceIdForData());
    }

    public override componentDidMount(): void {
        void this.messageHandler.enable().then(() => {
            this.forceUpdate();
        });
        // this.unsubscribePageSelectionChanged = this.props.store.subscribe(
        //     UIInterface.selector.selection(instanceIdForUI()),
        //     this.onPageSelectionChanged.bind(this),
        // );

        this.props.store.startListen(
            ListenerFactor.createListener(
                UIInterface.selector.selection(instanceIdForUI()),
                this.onPageSelectionChanged.bind(this),
            ),
        );
    }

    public override componentWillUnmount(): void {
        void this.messageHandler.destroy();
        this.unsubscribePageSelectionChanged();
    }

    public render(): React.ReactNode {
        const storesWithMissing = this.props.store.selecte(DataInterface.selectors.allStores(instanceIdForData()));
        const stores = storesWithMissing instanceof Missing ? [] : storesWithMissing;
        return (
            <div>
                <div id="store-list">
                    <ul>
                        {stores.map((value) => (
                            <li>{`${value.id}  ${value.name}`}</li>
                        ))}
                    </ul>
                </div>
                <div id="store-display-content">
                    <div id="store-display-selector">
                        {/* this part to select action list, store state list, error list, seletor list */}
                        <SelectBox currentSelection={this.selection} onChange={this.changePageSelection.bind(this)} />
                    </div>
                    <div id="store-display-data-area"></div>
                </div>
            </div>
        );
    }

    private onPageSelectionChanged(
        _: AppOperationSelection | undefined,
        newSelection: AppOperationSelection | undefined,
    ): void {
        if (newSelection) {
            this.selection = newSelection;
            this.forceUpdate();
        }
    }

    private changePageSelection(selection: AppOperationSelection): void {
        this.props.store.dispatch(UIInterface.actions.changeSelection(instanceIdForUI(), selection));
    }
}
