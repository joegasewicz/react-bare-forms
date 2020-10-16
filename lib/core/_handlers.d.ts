import * as React from "react";
import { IRadioGroupParentContext } from "../form";
/** @internal */
declare type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;
/** @internal */
export declare function updateParentState(parentState: any, setParentState: Function, formKey?: string): TypeHandler;
/** @internal */
export declare function updateRadioGroupStateFromPassedInContext(parentState: any, setParentState: Function, formKey?: string): (e: React.ChangeEvent<any>, name: string, radioGroup: IRadioGroupParentContext) => void;
export {};
