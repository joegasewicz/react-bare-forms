import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "./_errors";

export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}

/**
 *
 * @param minLength
 */
export function isFieldEmpty(minLength: number = null): Function {
    if(!minLength) {
        throw new _FieldEmptyErrorMsg(_isFieldEmptyErrorMsg);

    }
    return function (...args: Array<any>): IValidation {
        const isValid = (args[0].length >= args[1]);
        return {
            isValid,
            messages: ["Must be at least 50 characters"],
        }
    }
}
