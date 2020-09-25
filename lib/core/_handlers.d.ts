import * as React from "react";
import { IRadioGroupParentContext } from "../form";
/** @internal */
declare type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;
/** @internal */
export declare function updateParentState(parentState: any, setParentState: Function): TypeHandler;
/** @internal */
export declare function updateRadioGroupStateFromPassedInContext(parentState: any, setParentState: Function): (e: React.ChangeEvent<any>, name: string, radioGroup: IRadioGroupParentContext) => void;
export {};
