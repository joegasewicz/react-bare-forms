import * as React from "react";
import {handleChange} from "./handlers";
import {FieldTypes} from "./form-elements";
import {IFormContext} from "./form";

/**
 *
 * @param fieldType
 * @param name
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
