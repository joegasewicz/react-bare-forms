import {FieldTypes} from "../_src/form-elements";
import {IFormContext} from "../_src/form";
import {handleChange} from "../_src/handlers";
import * as React from "react";

/**
 *
 * @param fieldType
 * @param name
 * @param context
 */
export const selectTextField = (fieldType: FieldTypes, name: any, context: IFormContext) => {
    switch(fieldType) {
        case "text": {
            return <input type="text" className="form-control" onChange={handleChange(name, context)} />;
        }
        case "email": {
            return <input type="email" className="form-control" onChange={handleChange(name, context)} />;
        }
        case "password": {
            // TODO confirm password
            return <input type="password" className="form-control" onChange={handleChange(name, context)} />;
        }
        default: {
            return <input type="text" className="form-control" onChange={handleChange(name, context)} />;
        }
    }
};


export function updateStateFromPassedInContext(state: any, setState: Function): (e: any) => void {
    return (e: any) => {
        setState({
            message: e.target.value,
        });
    };

}
