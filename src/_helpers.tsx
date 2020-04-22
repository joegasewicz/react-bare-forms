import * as React from "react";
import {handleChange} from "./handlers";
import {FieldTypes} from "./form-elements";

/**
 *
 * @param fieldType
 * @param name
 */
export const selectTextField = (fieldType: FieldTypes, name: any) => {
    switch(fieldType) {
        case "text": {
            return <input type="text" className="form-control" />;
        }
        case "email": {
            return <input type="email" className="form-control"/>;
        }
        case "password": {
            // TODO confirm password
            return <input type="password" className="form-control"/>;
        }
        default: {
            return <input type="text" className="form-control"/>;
        }
    }
};
