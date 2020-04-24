/** @internal */
import * as React from "react";

type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
export function updateStateFromPassedInContext(parentState: any, setParentState: Function): TypeHandler {
    return (e: React.ChangeEvent<any>, name: string) => {
        setParentState({
            [name]: e.target.value,
        });
    };
}
