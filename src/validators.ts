import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "./_errors";
import {default as React, ReactElement} from "react";
import {shouldShowValidation} from "../_src/_helpers";
import {FormContext, IFormContext, IFormElementValidators} from "../_src/form";
import {FormConsumer} from "./form";

export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}

/** The inner returned function type that custom validators must implement */
export type IValidationFunction = (...args: Array<any>) => IValidation|_FieldEmptyErrorMsg;
/** All custom validators must implement this type */
export type IValidator = (t: any) => IValidationFunction;
/** The expected validator's type that {@link IField} elements can consume */
export type IValidators = Array<IValidationFunction>;


/**
 * The `passwordKey` is normally the first password form field the user fills in before
 * then confirming that the password is correct with a confirm password field. this validator
 * check that both password fields are equal or else will return an error message and set this
 * field to invalid.`
 * @example
 * ```
 *  <PasswordField
 *      // other props...
 *      name="myPassword"
 *  />
 *
 *  <ConfirmPasswordField
 *        // other props...
 *        validators={[areFieldsEqual("myPassword")]}
 *   />
 *   // message: Password fields do not match
 * ```
 * @param `passwordKey` The name of the password form element you watch to match against
 */
export function areFieldsEqual(passwordKey: string): IValidationFunction {
    return (...args: Array<any>): IValidation => {
        const [password, confirmPassword] = args;
        if(password === confirmPassword) {
            return {
                isValid: true,
                messages: [],
            }
        } else {
            return {
                isValid: false,
                messages: [`Password fields do not match`],
            }
        }
    }
}

/**
 * The `isFieldEmpty` validator performs a comparison against `minLength` & the field element
 * value. If they are equal or the `minLength` is greater than the form element value then
 * this element is not valid & a message is displayed.
 * @example
 * ```
 *  <TextInputField
 *        // other props...
 *        validators={[isFieldEmpty(5)]}
 *   />
 *   // message: Must be at least 5 characters`
 * ```
 * @param minLength The minimum length of the form field value
 */
export function isFieldEmpty(minLength: number = null): IValidationFunction {
    if(minLength === null) {
        throw new _FieldEmptyErrorMsg(_isFieldEmptyErrorMsg);
    }
    return function (...args: Array<any>): IValidation {
        let messages: Array<string> = [];
        const testValue = args[0];
        const isValid = (testValue.length >= minLength);
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
