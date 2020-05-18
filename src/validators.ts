import {_FieldEmptyErrorMsg} from "./core/_errors";
import {IFormContext} from "./form";
import {EMAIL_REGEX} from "./core/_regex";


/** @internal */
export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}
/** @internal The inner returned function type that custom validators must implement */
export type IValidationFunction = (...args: Array<any>) => IValidation|_FieldEmptyErrorMsg;
/** @internal The expected validator's type that {@link IField} elements can consume */
export type IValidators = Array<IValidationFunction>;
/** @internal The custom validator type callback */
export type ICustomValidatorCallback = (arg: any, fieldValue: any, context: IFormContext) => Array<string>|undefined;
/** @internal */
export type IValidationVariable = (arg?: any) => IValidationFunction;
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
 *   // message: Fields do not match
 * ```
 * @param `passwordKey` The name of the password form element you watch to match against
 */
export const areFieldsEqual: IValidationVariable = customValidator((passwordKey, fieldValue, context) => {
    if(fieldValue !== context.state[passwordKey]) {
        return [`Fields do not match`];
    }
});

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
 *   // message: Must be at least 5 characters
 * ```
 * @param minLength The minimum length of the form field value
 */
export const isFieldEmpty: IValidationVariable = customValidator((minLength, fieldValue, _) => {
    const isValid = (fieldValue && fieldValue.length >= minLength);
    if(!isValid) {
        return [`Must be at least ${minLength} characters`];
    }
});

/**
 * This validator doesn't require any arguments to be passed in.
 * @example
 * ```
 *  <EmailField
 *    // other props...
 *    validators={[isEmailValid()]}
 *  />
 *  // message: Must be a valid email
 * ```
 */
export const isEmailValid: IValidationVariable = customValidator((_ , fieldValue, context) => {
    const isValid = EMAIL_REGEX.test(String(fieldValue).toLowerCase());
    if(!isValid) {
        return [`Must be a valid email`];
    }
});

/**
 * @example
 */
// export const isFile: IValidationVariable = customValidator((_, name, context) => {
//     if(name in context.metadata.files) {
//         if(!context.metadata.files[name].file || Object.keys(context.metadata.files[name].file).length === 0) {
//             return [`Must be a file type`];
//         }
//     }
// });

/**
 *
 */
// export const isRadioChecked: IValidationVariable = customValidator((_ , [name, parent], context) => {
//     let fieldGroup = context.metadata.radioGroups[parent];
//     if(fieldGroup) {
//         // @ts-ignore TODO
//         let radio = fieldGroup[name];
//         if(radio && !radio.isChecked) {
//             return [`Radio ... must be selected`];
//         }
//     }
// });

/**
 *
 */
export const isChecked: IValidationVariable = customValidator((_, fieldValue, context) => {
    if(fieldValue === false) {
        return [`Must be checked`];
    }
});

/**
 * Function that takes a callback which contains the callers own validation logic
 * & returns an array of string(s) which are the validation error message or *undefined*. Below is an
 * example of creating a custom validator to test if a field has a string length of nth.
 *
 * There are 3 arguments available to your custom validation callback:
 *  - **arg** This is the your own value used to in the validation comparison
 *  @example
 *  ```
 *  const myArg = 5;`
 *
 *  <TextInputField
 *    // other props...
 *    validators={[myValidator(myArg)]} // <- `myArg`
 *  />
 * ```
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
export function customValidator(callback: ICustomValidatorCallback): (arg: any) => IValidationFunction  {
    return (arg: any = null): IValidationFunction => {
        return (...args: Array<any>) => {
            const fieldValue: any = args[0];
            const context: IFormContext = args[1];
            const messages = callback(arg, fieldValue, context);
            let validationData;
            if (Array.isArray(messages) && messages.length >= 1) {
                validationData = {
                    isValid: false,
                    messages,
                }
            } else {
                validationData = {
                    isValid: true,
                    messages: [],
                }
            }
            return validationData;
        }
    }
}
