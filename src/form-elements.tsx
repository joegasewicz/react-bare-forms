import {default as React, ReactElement} from "react";
import {FormConsumer, FormProvider, IForm, IFormContext} from "./form";
import {IValidators} from "./validators";
import {FormElementValidators, FormGroup, mergeDefaultCssWithProps} from "./_helpers";
import {
    InputField,
    TextAreaField as _TextAreaField,
    CheckBoxField as _CheckBoxField,
    RadioField as _RadioField,
    SelectField as _SelectField,
} from "./Field";



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

export interface ISelectField extends IField {
    value: any;
    options: Array<string>;
}

/**
 *
 * @param props
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextInputField
 *    value={this.state.username}
 *    name="username"
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextInputField
 *    value={this.state.username}
 *    name="username"
 *    hint="Needs to be at least 50 characters long"
 *    labelText="Username"
 *  />
 * ```
 * @constructor
 */
export const TextInputField = (props: ITextInputField) => {
  const textInput = new InputField<ITextInputField>("text", props);
  return textInput.create();
};

/**
 *
 * @param props
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <PasswordField
 *    value={this.state.username}
 *    name="username"
 *    validators={[isEmailValid()]}
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <PasswordField
 *    value={this.state.password}
 *    name="password"
 *    hint="Needs to be at least 8 characters long"
 *    labelText="Password"
 *    validators={[isEmailValid()]}
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
 *  validators={[isEmailValid()]}
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
  const passwordInput = new InputField<IPasswordField>("password", props);
  return passwordInput.create();
};

/**
 *
 * @param props
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextInputField
 *    value={this.state.username}
 *    name="username"
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextInputField
 *    value={this.state.username}
 *    name="username"
 *    hint="Needs to be at least 50 characters long"
 *    labelText="Username"
 *  />
 * ```
 * @constructor
 */
export const EmailField = (props: IEmailField) => {
  const emailInput = new InputField<IEmailField>("email", props);
  return emailInput.create();
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
  const checkBox = new _CheckBoxField<ICheckBoxField>("checkbox", props);
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
  const textArea = new _TextAreaField(props);
  return textArea.create();
};

export interface IRadioGroupProps {
    name: string;
    children: any;
}


export const RadioGroupContext = React.createContext({});

export interface IRadioGroupParentContext {
    parent: { name: string };
    children: any; // TODO
}

/**
 *
 * @param props
 * @constructor
 */
export function RadioGroup(props: IRadioGroupProps) {
    const contextValue: IRadioGroupParentContext = {parent: {name: props.name}, children: props.children};
    return (<>
        <FormConsumer>
            {(context: IFormContext) => {
                // update state on next cycle tick - TODO use useEffect
                setTimeout(() => context.updateRadioGroupMetadata(props.name, props.children));
                return <RadioGroupContext.Provider value={contextValue}>{props.children}</RadioGroupContext.Provider>;
            }}
        </FormConsumer>
</>);
}

/**
 *
 * @param props
 * @constructor
 */
export const RadioField = (props: IRadioField) => {
    const radio = new _RadioField("radio", props);
    return radio.create();
};

/**
 *
 * @param props
 * @constructor
 */
export const SelectField = (props: ISelectField) => {
    const select = new _SelectField(props);
    return select.create();
};

