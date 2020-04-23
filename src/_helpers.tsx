import * as React from "react";
import {handleChange} from "./handlers";
import {FieldTypes} from "./form-elements";
import {FormType, IFormContext, IFormElementMeta} from "./form";
import {IValidation} from "./validators";
import {SyntheticEvent} from "react";
import {ChangeEvent} from "react";

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
export const shouldShowValidation = (validationResult: IValidation, context: IFormContext, name: string) => {
    return (!validationResult.isValid && context.dynamic && context.formMetaData[name].isTouched) ||
        (!validationResult.isValid && context.isSubmitted);
};


/**
 *
 * @param update
 * @param current
 */
export function setFormData(update: Function, current: IFormContext) {
    return (name: any, e: ChangeEvent<FormType>) => {
            const elementMetaData: IFormElementMeta = {
                value: e.target.value,
                isTouched: true,
            };
            update({
            ...current,
            state: {
                ...current.state,
                [current.formKey]: {
                    ...current.state[current.formKey],
                    [name]: e.target.value,
                }
            },
            formMetaData: {
                ...current.formMetaData,
                [name]: elementMetaData,
            },
        });
    };
}

/**
 *
 * @param update
 * @param current
 */
export const setIsSubmitted = (update: Function, current: IFormContext): Function => {
    return (): void => {
        update({
            ...current,
            isSubmitted: true,
        });
    }

};
