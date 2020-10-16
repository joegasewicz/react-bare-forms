// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";
import {IRadioGroupParentContext} from "../form";

/** @internal */
type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
function _getCorrectStatePositionFromFormKey(parentState: any, formKey: string = "", obj: any = {}): {[key: string]: any} {
    if(formKey) {
       let res =  {
            [formKey]: {
                ...parentState[formKey],
                ...obj,
            },
        }
        return res;
    } else {
        return {
            ...parentState,
            ...obj,
        }
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
                ..._getCorrectStatePositionFromFormKey(parentState, formKey, {[name]: e.target.value}),
            };
            let parentName = (radioGroup as any).parent.name; // TODO remove if not used...
            for(let children of radioGroup.children) {
                if(children.props.name !== name) {
                    newState = {
                        ...newState,
                        ..._getCorrectStatePositionFromFormKey(parentState, formKey, {[children.props.name]: false}),
                    }
                }
            }
            setParentState(newState);
        }
    }
}
