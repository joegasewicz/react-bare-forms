import * as React from "react";


/** @internal */
export function updateStateFromPassedInContext(parentState: any, setParentState: Function): (e: any) => void {
    return (e: React.ChangeEvent<any>) => {
        setParentState({
            message: e.target.value,
        });
    };

}
