import {default as React} from "react";

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
    RadioField as _RadioField,
    SelectField as _SelectField,
    TextAreaField as _TextAreaField,
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
}

export interface IField {
    /** The name of the form element (this should match the state property that you want be updated by this form element) */
    name: string;
    /** If *bare* (see {@link IForm.bare}) is set to true then *labelText* will be inserted within **label** tags. */
    labelText?: string;
    /** If *bare* (see {@link Form.bare}) is set to true then *hint* will be inserted within **small** tags. */
    hint?: string;
    /** These are the {@link IValidators} that you can pass in the validate the form element. */
    validators?: IValidators;
    /** Add additional css */
    className?: string;
}

export interface ITextInputField extends IField {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IPasswordField extends IField {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IEmailField extends IField {
    /** The state property that gets updated by this input field */
    value: any;
}

export interface ICheckBoxField extends IField {
    checked: boolean;
}

export interface ITextAreaField extends IField {
    rows?: number;
    /** The state property that gets updated by this input field */
    value: any;
}

export interface IRadioField extends IField {
    checked: boolean;
    disabled?: boolean;
}

export interface IFileField extends IField {
    ref: React.RefObject<HTMLFormElement>;
}

export type TypeSelectCssSizeName = |"sm"|"default"|"lg";

export interface ISelectField extends IField {
    value: any;
    options: Array<string>;
    size?: TypeSelectCssSizeName;
}

/**
 *
 * @param props
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
 *    labelText="Username"
 *  />
 * ```
 * @constructor
 */
export const TextInputField = (props: ITextInputField) => {
  const textInput = new InputField<ITextInputField>(FIELD_NAMES.TEXT, props);
  return textInput.create();
};

/**
 *@param props
 *
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
 *    labelText="Username"
 *  />
 * ```
 * @constructor
 */
export const EmailField = (props: IEmailField) => {
    const emailInput = new InputField<IEmailField>(FIELD_NAMES.EMAIL, props);
    return emailInput.create();
};

/**
 *  The `PasswordField` works the same as the `EmailField` & `TextInputField`'s.
 * @param props
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
 *    labelText="Password"
 *  />
 *  ```
 * Also we can create two *PasswordField* components to confirm passwords are equal. Please see
 * {@link areFieldsEqual} for more info.
 * The first *PasswordField* has has a *name* prop of **password** & the second *PasswordField* a name
 * prop of *confirmPassword*. Then we can add a {@link areFieldsEqual} validator to the *PasswordField*
 * with the *confirmPassword* name props (also notice how {@link areFieldsEqual} takes the first *PasswordField*
 * name as an argument).
 *
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
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 *
 * <CheckBoxField
 *   name="terms"
 *   checked={this.state.terms}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 * <CheckBoxField
 *   name="terms"
 *   checked={this.state.terms}
 *   hint="Click to agree"
 *   labelText="Agree to terms & conditions"
 * />
 * ```
 * @param props
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
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextAreaField
 *    value={this.state.about}
 *    name="about"
 *    validators={[isFieldEmpty(20)]}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextAreaField
 *    name="about"
 *    value={this.state.about}
 *    hint="Must be at least 20 characters"
 *    labelText="About you..."
 *    validators={[isFieldEmpty(20)]}
 * />
 * ```
 * @param props
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
 *
 * @param props
 * @constructor
 */
export function RadioGroup(props: IRadioGroupProps) {
    const contextValue: IRadioGroupParentContext = {parent: {name: props.name}, children: props.children};
    return <RadioGroupContext.Provider value={contextValue as TypeRadioGroupMetadata}>{props.children}</RadioGroupContext.Provider>;
}

/**
 *
 * @param props
 * @constructor
 */
export const RadioField = (props: IRadioField) => {
    const radio = new _RadioField(FIELD_NAMES.RADIO, props);
    return radio.create();
};

/**
 *
 * @param props
 * @constructor
 */
export const SelectField = (props: ISelectField) => {
    const select = new _SelectField(FIELD_NAMES.SELECT, props);
    return select.create();
};

/**
 *
 * @param props
 * @constructor
 */
export const FileField = React.forwardRef((props: IFileField, ref: React.RefObject<HTMLFormElement>|any) => {
    let _props = {...props, ref };
    const file = new _FileField<IFileField>(FIELD_NAMES.FILE, _props);
    return file.create();
});


export const SubmitButton = new _SubmitButton().create();
