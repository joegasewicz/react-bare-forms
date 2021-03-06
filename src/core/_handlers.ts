// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";
import {IQueryState, IRadioGroupParentContext, TypeCursorPositionState, TypeQueryState} from "../form";

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
export function updateCursorPosCallback(cursorState: TypeCursorPositionState, updateCursorState: any): (fieldName: string, cursorPosition: number) => void {
    return (fieldName: string, cursorPosition: number): void => {
        if (!(fieldName in cursorState) || cursorState[fieldName].cursorPosition !== cursorPosition) {
             const state = {
                ...cursorState,
                [fieldName]: {
                    fieldName,
                    cursorPosition,
                }
            };
            updateCursorState(state);
        }
    }
}

/** @internal */
export function updateQueryResultsCallback(queryState: TypeQueryState, updateQueryState: any) {
    return (fieldName: string, showResults: boolean): void => {
        const state: TypeQueryState = {
           ...queryState,
            [fieldName]: {
                ...queryState[fieldName],
                showResults,
            }
        };
        updateQueryState(state);
    }
}

/**
 * @internal
 */
export function updateParentState(parentState: any, setParentState: Function, formKey: string = ""): TypeHandler {
    return (e: React.ChangeEvent<any> | null, name: string, fieldValue?: any) => {
        let value: any;
        if(e && !fieldValue) {
          value = e.target.value;
        } else if(fieldValue) {
            // If event is null then we are getting field values from fieldValue param
             value = fieldValue
        }
        if (typeof value !== "undefined") {
            setParentState({
                ...parentState,
                ..._getCorrectStatePositionFromFormKey(parentState, formKey, {[name]: value}),
            });
        }

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

