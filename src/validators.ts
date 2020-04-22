import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "./_errors";

export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}

export type IValidationFunction = (...args: Array<any>) => IValidation|_FieldEmptyErrorMsg;

/**
 *
 * @param minLength Then minimum length of the value
 */
export function isFieldEmpty(minLength: number = null): IValidationFunction {
    if(minLength === null) {
        throw new _FieldEmptyErrorMsg(_isFieldEmptyErrorMsg);
    }
    return function (...args: Array<any>): IValidation {
        let messages: Array<string> = [];
        const isValid = (args[0].length >= minLength);
        if(!isValid) {
            messages = [`Must be at least ${minLength} characters`];
        }
        return {
            isValid,
            messages,
        }
    }
}
