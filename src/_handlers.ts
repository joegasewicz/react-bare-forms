// Handlers
// Handlers are methods on the context object that update state.
import * as React from "react";

/** @internal */
type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
export function updateStateFromPassedInContext(parentState: any, setParentState: Function): TypeHandler {
    return (e: React.ChangeEvent<any>, name: string) => {
        setParentState({
            [name]: e.target.value,
        });
    };
}
