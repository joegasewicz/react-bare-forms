import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "./_errors";

export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}

export type Validators = Array<(...args: Array<any>) => any>; // TODO fix type

export type IValidationFunction = (...args: Array<any>) => IValidation|_FieldEmptyErrorMsg;

/**
 *
 * @param minLength The minimum length required
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

/**
 * Function that takes a callback which contains the callers own validation logic
 * & returns an object with isValid & messages keys.
 * @param callback
 */
export function customValidator(callback: (...args: Array<any>) => IValidation): IValidationFunction  {
    return function (...args: Array<any>) {
        return callback(...args);
    }
}
