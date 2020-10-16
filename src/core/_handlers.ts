// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";
import {IRadioGroupParentContext} from "../form";

/** @internal */
type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
function _getCorrectStatePositionFromFormKey(parentState: any, formKey: string = "", obj: any = {}): {[key: string]: any} {
    if(formKey) {
       return {
            [formKey]: {
                ...parentState[formKey],
                ...obj,
            },
        };
    } else {
        return {
            ...parentState,
            ...obj,
        };
    }
}

/** @internal */
export function updateParentState(parentState: any, setParentState: Function, formKey: string = ""): TypeHandler {
    return (e: React.ChangeEvent<any>, name: string) => {
        setParentState({
            ...parentState,
            ..._getCorrectStatePositionFromFormKey(parentState, formKey, {[name]: e.target.value}),
        });
    };
}

/** @internal */
export function updateRadioGroupStateFromPassedInContext(parentState: any, setParentState: Function, formKey: string = "") {
    return (e: React.ChangeEvent<any>, name: string, radioGroup: IRadioGroupParentContext) => {
        if (radioGroup) {
            let newState = {
                ...parentState,
                 ..._getCorrectStatePositionFromFormKey(parentState, formKey, {[name]: true}),
            };
            for(let children of radioGroup.children) {
                if(children.props.name !== name) {
                    newState = {
                        ...newState,
                        ..._getCorrectStatePositionFromFormKey(newState, formKey, {[children.props.name]: false}),
                    }
                }
            }
            setParentState(newState);
        }
    }
}
