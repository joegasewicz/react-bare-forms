import {_FieldEmptyErrorMsg,  _isFieldEmptyErrorMsg} from "./_errors";
import {default as React, ReactElement} from "react";
import {FormConsumer, IFormContext} from "./form";

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
/** The custom validator type callback */
export type ICreateValidatorCallback = (arg: any, fieldValue: any, context: IFormContext) => Array<string>|null;

export type IValidationVariable = (arg: any) => IValidationFunction;
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
        const [password, context] = args;
        if(password === context.state[passwordKey]) {
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
export const isFieldEmpty: IValidationVariable = customValidator((minLength, fieldValue, context) => {
    const isValid = (fieldValue.length >= minLength);
    if(!isValid) {
        return [`Must be at least ${minLength} characters`];
    }
});

/**
 * Function that takes a callback which contains the callers own validation logic
 * & returns an object with isValid & messages keys. Below is an example of creating
 * a custom validator to test if a field has a string length of nth.
 *
 * There are 3 arguments available to your custom validation callback:
 *  - **arg** This is the your own value used to in the validation comparison
 *  @example
 *  ``
 *  const myArg = 5;
 *
 *  <TextInputField
 *    // other props...
 *    validators={[myValidator(myArg)]} // <- `myArg`
 *  />
 *  ```
 *
 *  - **fieldValue** This is the current form element value being passed to the validator
 *  - **context** This is the context object that contains the state
 * For example:
 * @example
 * ````
 * const isFieldEmpty = createValidator((minLength, fieldValue, context) => {
 *     const isValid = (fieldValue.length >= minLength);
 *     if(!isValid) {
 *         return [`Must be at least ${minLength} characters`];
 *     }
 * });
 * ``
 * You only need to return type an array of string(s) (which is your validation message)
 * if the `fieldValue`is **NOT** validated.
 * @param callback
 */
export function customValidator(callback: ICreateValidatorCallback): (arg: any) => IValidationFunction  {
    return (arg: any): IValidationFunction => {
        return (...args: Array<any>) => {
            const fieldValue: any = args[0];
            const context: IFormContext = args[1];
            const messages = callback(arg, fieldValue, context);
            if (Array.isArray(messages) && messages.length >= 1) {
                return {
                    isValid: false,
                    messages,
                }
            } else {
                return {
                    isValid: true,
                    messages: [],
                }
            }
        }
    }
}
