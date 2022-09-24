import {EMAIL_REGEX} from "./core";
import {IFormContext} from "./form";
import {IField, IFieldBase} from "./elements";
import {_DateValidatorArgsError, _DateValidatorArgsErrorMsg} from "./core/_errors";


/** @internal */
export interface IValidation {
    isValid: boolean;
    messages: [...string[]];
}
/** @internal The inner returned function type that custom validators must implement */
export type IValidationFunction = (...args: Array<any>) => IValidation;
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
 * @function
 */
export const areFieldsEqual: IValidationVariable = customValidator((fieldKey, fieldValue, context: IFormContext) => {
    let testField: IFieldBase;
    let message = [`Fields do not match`];
    let contextState = getFormStateFromContext(context);
    if(fieldKey in contextState) {
        testField = contextState[fieldKey];
        if(!testField || !fieldValue  || fieldValue !== contextState[fieldKey]) {
            return message;
        }
    } else {
        throw new Error(
            `React-BareForms Error: No Field with name of ${fieldKey} exists when calling 'areFieldsEqual' `
            + `validator function.\n For more info, visit: `
            + `https://joegasewicz.github.io/react-bare-forms/modules/_validators_.html#arefieldsequal`,
        );
    }
});


/**
 * The `isFieldEmpty` validator performs a comparison against `minLength` & the field element
 * value. If they are equal or the `minLength` is greater than the form element value then
 * this element is not valid & a message is displayed.
 * @example
 * import {TextInputField, isFieldEmpty} from "react-base-forms"
 *
 * const state = { username: "" }
 * ```
 *  <TextInputField
 *        value={state.username}
 *        name="username"
 *        validators={[isFieldEmpty(5)]}
 *   />
 *   // message: Must be at least 5 characters
 * ```
 * @param minLength The minimum length of the form field value
 * @function
 */
export const isFieldEmpty: IValidationVariable = customValidator((minLength, fieldValue, _) => {
    const isValid = (typeof fieldValue !== "undefined" && fieldValue.length >= minLength);
    if(!isValid) {
        return [`Must be at least ${minLength} characters`];
    }
});

/**
 * This validator doesn't require any arguments to be passed in.
 * @example
 * import {EmailField, isEmailValid} from "react-base-forms"
 *
 * const state = { terms: false }
 * ```
 *  <EmailField
 *    // other props...
 *    validators={[isEmailValid()]}
 *  />
 *  // message: Must be a valid email
 * ```
 *
 * @function
 */
export const isEmailValid: IValidationVariable = customValidator((_ , fieldValue, context) => {
    const isValid = EMAIL_REGEX.test(String(fieldValue).toLowerCase());
    if(!isValid) {
        return [`Must be a valid email`];
    }
});

/**
 * This validator will display the warning if a user has selected a file but then reselected
 * nothing (by clicking the cancel button in the file popup window). This validator doesn't
 * require any arguments to be passed in.
 * @example
 * ```
 * import {createFileRef, FileField, isFile} from "react-bare-forms";
 *
 * const myFileRef = createFileRef();
 *
 * <FileField
 *    ref={myFileRef}
 *    hint="Must be a file"
 *    labeltext="Upload your file"
 *    name="myFileTest"
 *    validators={[isFile()]}
 * />
 * ```
 *
 * @function
 */
export const isFile: IValidationVariable = customValidator((_, name, context) => {
    if(!name) {
        return [`Must be a file type`];
    }
});

/**
 * To use the `isRadioChecked`, select the `RadioField` component you wish the user to select
 * & add the validator function to the `validators` prop. This will now display a warning if
 * the user has deselected the required option. This validator doesn't
 * require any arguments to be passed in.
 * @example
 * import {RadioGroup, RadioField} from "react-base-forms"
 *
 * const state = { male: true, female: false }
 *
 * <RadioGroup name="group1">
 *     <RadioField
 *       name="male"
 *       checked={state.female}
 *       validators={[isRadioChecked()]}
 *    />
 *    <RadioField
 *       name="female"
 *       checked={state.female}
 *    />
 * </RadioGroup>
 *
 * @function
 */
export const isRadioChecked: IValidationVariable = customValidator((_ , value, context) => {
    if(!value) {
        return [`This option must be selected`];
    }
});

/**
 * The `isChecked` validator will display a warning if the user has selected the checkbox &
 * then deselected it. This requires a *boolean* type to be set in your state, see below.
 * This validator doesn't require any arguments to be passed in.
 * @example
 * import {CheckBoxField, isChecked} from "react-base-forms"
 *
 * const state = { terms: false }
 *
 * <CheckBoxField
 *    name="terms"
 *    checked={this.state.terms}
 *    validators={[isChecked()]}
 * />
 *
 * @function
 */
export const isChecked: IValidationVariable = customValidator((_, fieldValue, context) => {
    if(fieldValue === false) {
        return [`Must be checked`];
    }
});

/**
 * To use the {@link isValidDate} pass in an array containing
 * either a from or to date string OR both OR none.
 * @example
 * ```
 *    <DatePickerField
 *        value={fpState.date}
 *        name="date"
 *        // Optional validators
 *        validators={[isValidDate(["2021-01-10", "2021-03-10"])]}
 *    />
 * ```
 * @function
 */
export const isValidDate: IValidationVariable = customValidator((args: [string, string], fieldValue: Date, _) => {
    let isValid = false;
    if (!fieldValue) {
        return [`Must be a valid date`];
    }
    if (!args || !args.length) {
        throw new _DateValidatorArgsError(_DateValidatorArgsErrorMsg);
    }
    const [from, to] = args;
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;
    if (fromDate && toDate) {
        if(fieldValue > fromDate && fieldValue < toDate) {
            isValid = true;
        }
    }

    if(!isValid) {
        return [`Must be a valid date`];
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
 * ````
 * You only need to return type an array of string(s) (which is your validation message)
 * if the `fieldValue`is **NOT** validated.
 * @param callback
 * @function
 */
export function customValidator(callback: ICustomValidatorCallback): (arg: any) => IValidationFunction  {
    return (arg: any = null): IValidationFunction => {
        return (...args: Array<any>) => {
            // TODO custom exceptions for the below args
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

/**
 * Helper function to get correct state from the context object within a validator:
 *  - **arg** context {IFormContext}
 *  @example
 *  ```
 *  let contextState = getFormStateFromContext(context);
 * ```
 * @param context
 * @function
 */
export function getFormStateFromContext(context: IFormContext) {
    if(context.formKey) {
        return context.state[context.formKey];
    }
    return context.state;
}
