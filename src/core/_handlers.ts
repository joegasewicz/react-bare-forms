// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";
import {IRadioGroupParentContext} from "../form";

/** @internal */
type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
export function updateParentState(parentState: any, setParentState: Function): TypeHandler {
    return (e: React.ChangeEvent<any>, name: string) => {
        setParentState({
            [name]: e.target.value,
        });
    };
}

/** @internal */
export function updateRadioGroupStateFromPassedInContext(parentState: any, setParentState: Function) {
    return (e: React.ChangeEvent<any>, name: string, radioGroup: IRadioGroupParentContext) => {
        if (radioGroup) {
            let newState = {
                ...parentState,
                [name]: true,
            };
            let parentName = (radioGroup as any).parent.name;
            for(let children of radioGroup.children) {
                if(children.props.name !== name) {
                    newState = {
                        ...newState,
                        [children.props.name]: false,
                    }
                }
            }
            setParentState(newState);
        }
    }
}
