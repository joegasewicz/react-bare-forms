import * as React from "react";
import {handleChange} from "./handlers";
import {FieldTypes} from "./form-elements";
import {IFormContext} from "./form";
import {IValidation} from "./validators";

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

/**
 *
 * @param validationResult
 * @param context
 */
export const shouldShowValidation = (validationResult: IValidation, context: IFormContext) => {
    return (!validationResult.isValid && context.dynamic) ||
        (!validationResult.isValid && context.isSubmitted);
};


/**
 *
 * @param update
 * @param current
 */
export function setFormData(update: Function, current: IFormContext) {
    return (name: any, value: any) => {
        update({
            ...current,
            state: {
                ...current.state,
                [current.formKey]: {
                    ...current.state[current.formKey],
                    [name]: value,
                }
            }
        });
    };
}
