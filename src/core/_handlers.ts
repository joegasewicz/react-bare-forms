// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";

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
    return (e: React.ChangeEvent<any>, name: string, radioGroup: any) => {
        if(radioGroup) {
            let newState = {[name]: true};
            Object.keys(radioGroup).forEach((key) => {
               if(radioGroup[key].name !== name) {
                   newState = {
                       ...newState,
                       [key]: false,
                   }
               }
            });
            setParentState({
                ...newState
            });
        }
    }
}
