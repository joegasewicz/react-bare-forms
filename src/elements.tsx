import {default as React, useState} from "react";

import {IValidators} from "./validators";
import {
    IForm,
    IRadioGroupParentContext,
    RadioGroupContext,
    TypeRadioGroupMetadata,
} from "./form";
import {SubmitButton as _SubmitButton,} from "./field_classes/_SubmitButton";
import {
    CheckBoxField as _CheckBoxField,
    FileField as _FileField,
    InputField,
    SelectField as _SelectField,
    RadioField as _RadioField,
    TextAreaField as _TextAreaField,
    DatePickerField as _DatePickerField,
    QueryField as _QueryField, QueryField,
} from "./field_classes";

/** @internal */
export enum FIELD_NAMES {
    TEXT = "text",
    EMAIL = "email",
    PASSWORD = "password",
    TEXTAREA = "textArea",
    RADIO  = "radio",
    CHECKBOX = "checkbox",
    SELECT = "select",
    FILE = "file",
    DATE = "date",
}

export interface IFieldBase {
    /** The name of the form element (this should match the state property that you want be updated by this form element) */
    name: string;
    /** If *bare* (see {@link IForm.bare}) is set to true then *labeltext* will be inserted within **label** tags. */
    labeltext?: string;
    /** If *bare* (see {@link Form.bare}) is set to true then *hint* will be inserted within **small** tags. */
    hint?: string;
    /** These are the {@link IValidators} that you can pass in the validate the form element. */
    validators?: IValidators;
    /** Add additional css */
    className?: string;
}

export interface IField<T> extends React.InputHTMLAttributes<T> {
    /** The name of the form element (this should match the state property that you want be updated by this form element) */
    name: string;
    /** If *bare* (see {@link IForm.bare}) is set to true then *labeltext* will be inserted within **label** tags. */
    labeltext?: string;
    /** If *bare* (see {@link Form.bare}) is set to true then *hint* will be inserted within **small** tags. */
    hint?: string;
    /** These are the {@link IValidators} that you can pass in the validate the form element. */
    validators?: IValidators;
    /** Add additional css */
    className?: string;
}

export interface ITextInputField extends IField<HTMLInputElement> {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IPasswordField extends IField<HTMLInputElement> {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IEmailField extends IField<HTMLInputElement> {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface ICheckBoxField extends IField<HTMLInputElement> {
    checked: boolean;
}

export interface ITextAreaField extends IField<HTMLTextAreaElement> {
    rows?: number;
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IDatePicker extends IField<HTMLInputElement> {
    value: any;
    /** Pass in the css class names to style the calender **/
    datePickerClassNames?: string;
}

export interface IQueryField extends IField<HTMLInputElement> {
    /** The state property that gets updated by this input field */
    value: any;
    /** Required. Array of key value results. */
    queryresults: Array<any>;
    /** The **queryresults** target key to display each value */
    objectkey: string;
}

export interface IRadioField extends IField<HTMLInputElement> {
    checked: boolean;
    disabled?: boolean;
}

export type TypeStyleSize = "small" | "large" | undefined;
export interface IFileField extends IField<HTMLInputElement> {
    ref: React.RefObject<HTMLFormElement>;
    translate?: "yes" | "no" | undefined;
    /** Displays the input field in either small or large styling */
    styleSize?: TypeStyleSize;
}

export type TypeSelectCssSizeName = |"sm"|"default"|"lg";

export interface ISelectField extends Omit<IField<HTMLSelectElement>, "size"> {
    value: any;
    options: Array<string|{[k: string]: any}>;
    size?: TypeSelectCssSizeName;
    objectkey?: string;
    objectvalue?: string;
}

/**
 *
 * @param props {@link ITextInputField}
 * @example
 * ```
 *  import {TextInputField} from "react-base-forms"
 *
 *  const state = { username: "" }
 *
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextInputField
 *    value={state.username}
 *    name="username"
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextInputField
 *    value={state.username}
 *    name="username"
 *    hint="Needs to be at least 50 characters long"
 *    labeltext="Username"
 *  />
 * ```
 * @constructor
 */
export const TextInputField = (props: ITextInputField) => {
  const textInput = new InputField<ITextInputField>(FIELD_NAMES.TEXT, props);
  return textInput.create();
};

/**
 *
 * @param props {@link IQueryField}
 * @example
 * This field provides a list of options to select from using the onChange event.
 * {@link IQueryField.queryresults} is the an array of objects (usually returned from a remote api)
 * {@link IQueryField.objectkey} is the key of the value you require to display when the user begins to type
 * ```
 *  let fruitState = [{name: "peach"},{name: "plum"}]
 *
 *  <QueryInputField
 *      value={fpState.fruit}
 *      name="fruit"
 *      hint="Enter your Fruit"
 *      labeltext="fruit"
 *      validators={[isFieldEmpty(2)]}
 *      queryresults={fruitState}
 *      objectkey="name"
 *  />
 * ```
 * @constructor
 */
export const QueryInputField = (props: IQueryField) => {
    const textInput = new QueryField<ITextInputField & IQueryField>(FIELD_NAMES.TEXT, props);
    return textInput.create();
};


/**
 * @param props {@link IEmailField}
 * @example
 * ```
 *  import {EmailField} from "react-base-forms"
 *
 *  const state = { email: "" }
 *
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <EmailField
 *    value={state.email}
 *    name="email"
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <EmailField
 *    value={state.email}
 *    name="email"
 *    hint="Needs to be at least 50 characters long"
 *    labeltext="Username"
 *  />
 * ```
 *
 * There is a bug when working with React & input fields. See https://github.com/facebook/react/issues/955
 * We have provided a fix for {@link TextInputField} and {@link PasswordField} fields but not {@link EmailField} fields.
 * If you wish to avoid the cursor jumping *bug*, then use a {@link TextInputField} with the {@link isEmailValid}
 * validator. For example:
 *
 * ```typescript jsx
 *    <TextInputField
 *       value={state.email}
 *       name="Must be a valid email"
 *       labeltext="Email"
 *      validators={[isEmailValid()]}
 *    />
 * ```
 * @constructor
 */
export const EmailField = (props: IEmailField) => {
    const emailInput = new InputField<IEmailField>(FIELD_NAMES.EMAIL, props);
    return emailInput.create();
};

/**
 *  The `PasswordField` works the same as the `EmailField` & `TextInputField`'s.
 * @param props {@link IPasswordField}
 * @example
 * ```
 *  import {areFieldsEqual, isFieldEmpty, PasswordField} from "react-base-forms";
 *
 *  const state = { password: "", confirmPassword: "" };
 *
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <PasswordField
 *    value={state.password}
 *    name="username"
 *    validators={[isFieldEmpty(8)]}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <PasswordField
 *    value={state.confirmPassword}
 *    name="password"
 *    hint="Needs to be at least 8 characters long"
 *    labeltext="Password"
 *  />
 *  ```
 * Also we can create two *PasswordField* components to confirm passwords are equal. Please see
 * {@link areFieldsEqual} for more info.
 * The first *PasswordField* has has a *name* prop of **password** & the second *PasswordField* a name
 * prop of *confirmPassword*. Then we can add a {@link areFieldsEqual} validator to the *PasswordField*
 * with the *confirmPassword* name props (also notice how {@link areFieldsEqual} takes the first *PasswordField*
 * name as an argument).
 *
 * @example
 * ```
 * <PasswordField
 *  name="password"
 *  // other props...
 *
 * />
 *
 * <PasswordField
 *  name="confirmPassword"
 *  // other props...
 *  validators={[areFieldsEqual("password")]}
 * />
 * ```
 *
 * @constructor
 */
export const PasswordField = (props: IPasswordField) => {
  const passwordInput = new InputField<IPasswordField>(FIELD_NAMES.PASSWORD, props);
  return passwordInput.create();
};



/**
 * The CheckBoxField requires a *checked* prop instead of a *value* prop. See
 * {@link ICheckBoxField}.
 * @example
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 *  import {CheckBoxField} from "react-base-forms";
 *
 *  const state = { password: "", confirmPassword: "" };
 *
 * <CheckBoxField
 *   name="terms"
 *   checked={state.terms}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 * <CheckBoxField
 *   name="terms"
 *   checked={state.terms}
 *   hint="Click to agree"
 *   labeltext="Agree to terms & conditions"
 * />
 * ```
 * @param props {@link ICheckBoxField}
 * @constructor
 */
export const CheckBoxField = (props: ICheckBoxField) => {
  const checkBox = new _CheckBoxField<ICheckBoxField>(FIELD_NAMES.CHECKBOX, props);
  return checkBox.create();
};

/**
 * The TextAreaField takes in an extra prop of *row* which is a number & declares
 * the number of rows displayed by the textarea element. The TextAreaField accepts
 * all the {@link IField} props.
 * @example
 * ```
 *  *  import {CheckBoxField} from "react-base-forms";
 *
 *  const state = { about: "" };
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextAreaField
 *    value={state.about}
 *    name="about"
 *    validators={[isFieldEmpty(20)]}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextAreaField
 *    name="about"
 *    value={state.about}
 *    hint="Must be at least 20 characters"
 *    labeltext="About you..."
 *    validators={[isFieldEmpty(20)]}
 * />
 * ```
 * @param props {@link ITextInputField}
 * @constructor
 */
export const TextAreaField = (props: ITextAreaField) => {
  const textArea = new _TextAreaField<ITextAreaField>(FIELD_NAMES.TEXTAREA, props);
  return textArea.create();
};

export interface IRadioGroupProps {
    name: string;
    children: any;
}

/**
 * @props {@link IRadioGroupProps}
 * @param props The `RadioGroup` component takes a single props of `name`, which
 * must be a unique to a form. See {@link RadioField}.
 * @constructor
 *
 * @example
 * ```
 *  import {CheckBoxField} from "react-base-forms";
 *
 *  const state = { male: true, female: false };
 *
 *  <RadioGroup name="group1">
 *    // place RadioFields components here...
 *  </RadioGroup>
 * ```
 *
 */
export function RadioGroup(props: IRadioGroupProps) {
    const contextValue: IRadioGroupParentContext = {parent: {name: props.name}, children: props.children};
    return <RadioGroupContext.Provider value={contextValue as TypeRadioGroupMetadata}>{props.children}</RadioGroupContext.Provider>;
}

/**
 *
 * @param props {@link IRadioField}
 * @constructor
 * `RadioField` inputs are designed to be used with the {@link RadioGroup} component.
 *  To use this component, add or nest it within a {@link RadioGroup} component as children.
 *  It's possible to also use validators with a RadioGroup, as shown below:
 * @example
 * ```
 *  import {isRadioChecked, RadioField, RadioGroup} from "react-base-forms";
 *
 *  const state = { male: true, female: false };
 *
 *  <RadioGroup name="group1">
 *    <RadioField
 *      name="male"
 *      checked={state.male}
 *      hint="Click to agree"
 *      labeltext="Agree to terms & conditions"
 *    />
 *
 *    <RadioField
 *      name="female"
 *      checked={state.female}
 *      hint="Click to agree"
 *      labeltext="Agree to terms & conditions"
 *      validators={[isRadioChecked()]}
 *    />
 *
 *  </RadioGroup>
 * ```
 */
export const RadioField = (props: IRadioField) => {
    const radio = new _RadioField(FIELD_NAMES.RADIO, props);
    return radio.create();
};

/**
 * A component to render a select field element.
 * @param props {@link ISelectField}
 * @constructor
 * @example
 * ```
 *  import {SelectField} from "react-base-forms";
 *
 *  const state = { fruitChoice: "" };
 *
 * <SelectField
 *   size="lg"
 *   value={state.fruitChoice}
 *   name="fruitChoice"
 *   options={["banana", "apple", "orange"]}
 *  />
 * ```
 *
 * You can also pass an array of objects but you must use both the
 * *objectKey* & *objectvalue* props. the `objectKey` will update your state
 * value & the `objectvalue` is what is displayed to the user as an option.
 * @example
 * ```
 * // This is your option data
 * let selectData = [
 *   {id: 1, name: "first"},
 *   {id: 2, name: "second"},
 * ];
 * // The state which will receive the update
 * let state = {
 *    select_data_id: undefined as any,
 * };
 *
 * <SelectField
 *   size="lg"
 *   value={state.select_data_id}
 *   name="fruitChoice"
 *   objectkey="id" // Value will update state.select_data_id e.g *1, 2...*
 *   objectvalue="name" // Value will be displayed in the select field e.g *first, second...*
 *   options={selectData}
 * />
 * ```
 */
export const SelectField = (props: ISelectField) => {
    const select = new _SelectField(FIELD_NAMES.SELECT, props);
    return select.create();
};

/**
 * @description A Date picker with optional validation
 * @param props {@link IDatePicker}
 * @constructor
 * The Datepicker field is already styled & includes optional validation for
 * to & from dates. To use the {@link isValidDate} pass in an array containing
 * either a from or to date string OR both OR none.
 * @example
 * ```
 *    <DatePickerField
 *        value={fpState.date}
 *        name="date"
 *        datePickerClassNames="yourClassnames"
 *        // Optional validators
 *        validators={[isValidDate(["2021-01-10", "2021-03-10"])]}
 *    />
 * ```
 */
export const DatePickerField = (props: IDatePicker) => {
    const datePicker = new _DatePickerField(FIELD_NAMES.DATE, props);
    return datePicker.create();
};

/**
 * The SubmitButton only requires a text string as children props (see below example).
 * The SubmitButton will be disabled until all form fields are validated.
 * @param props {@link ISubmitButtonProps}
 * @constructor
 * @example
 * ```
 * import {SubmitButton} from "react-base-forms";
 *
 * <SubmitButton>Submit</SubmitButton>
 * ```
 */
export const FileField = React.forwardRef((props: IFileField, ref: React.RefObject<HTMLFormElement>|any) => {
    let _props = {...props, ref };
    const file = new _FileField<IFileField>(FIELD_NAMES.FILE, _props);
    return file.create();
});



export const SubmitButton = new _SubmitButton().create();
