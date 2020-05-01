import {default as React, ReactElement} from "react";
import {FormConsumer, IFormContext} from "./form";
import {IValidators} from "./validators";
import {FormElementValidators, mergeDefaultCssWithProps} from "./_helpers";



export interface IField {
    /** The name of the form element (this should match the state property that you want be updated by this form element) */
    name: string;
    /** The state property that gets updated by this input field */
    value: any;
    /** If *bare* (see {@link IForm.bare}) is set to true then *labelText* will be inserted within **label** tags. */
    labelText?: string;
    /** If *bare* (see {@link Form.bare}) is set to true then *hint* will be inserted within **small** tags. */
    hint?: string;
    /** These are the {@link IValidators} that you can pass in the validate the form element. */
    validators?: IValidators;
    /** Add additional css */
    className?: string;
}

interface ITextInputField extends IField {}

interface IPasswordField extends IField {}

interface IEmailField extends IField {}

interface ICheckBoxField extends IField {}

interface ITextAreaField extends IField {
    rows?: number;
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
export const TextInputField = (props: ITextInputField) =>
    _createTextInputField("text")(props);

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
export const PasswordField = (props: IPasswordField) =>
    _createTextInputField("password")(props);

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
export const EmailField = (props: IEmailField) =>
    _createTextInputField("email")(props);


/**
 *
 * @param props
 * @constructor
 */
export const CheckBoxField = (props: ICheckBoxField) =>
    _createTextInputField("checkbox")(props);


/**
 * @internal
 * @param type
 * @private
 */
function _createTextInputField(type: string) {
    return (props: ITextInputField) => (
        <FormConsumer>
            {(context: IFormContext) => {
                const _input = <input
                    type={type}
                    value={(context as any)[props.name]}
                    onChange={(e) => context.updateParentState(e, props.name)}
                    name={props.name}
                    className={mergeDefaultCssWithProps("form-control", props.className, context.bare)}
                />;
                const _validate = props.validators ? <FormElementValidators validators={props.validators} name={props.name} />: null;
                if(context.bare) {
                    return (
                        <>
                            {_input}
                            {_validate}
                        </>
                    );
                } else {
                    return (
                        <FormGroup labelText={props.labelText} hint={props.hint}>
                            {_input}
                            {_validate}
                        </FormGroup>
                    )
                }

            }}
        </FormConsumer>
    );
}


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
    const { rows = 5 } = props;

    return (
        <FormConsumer>
            {(context: IFormContext) => {
                let _textArea: ReactElement<ITextAreaField> =
                    <textarea
                        className={mergeDefaultCssWithProps("form-control", props.className, context.bare)}
                        rows={rows}
                        value={(context as any)[props.name] }
                        onChange={(e) => context.updateParentState(e, props.name)}
                        name={props.name}
                    />;
                const _validate = props.validators ? <FormElementValidators validators={props.validators} name={props.name} />: null;
                if(context.bare) {
                    return <>
                        {_textArea}
                        {_validate}
                    </>;
                } else {
                    return (
                        <div className="form-group">
                            <label>{props.labelText}</label>
                            {_textArea}
                            {_validate}
                        </div>
                    )
                }
            }}
        </FormConsumer>
    );
};


/** @internal */
interface IFormGroup {
    children: any;
    labelText?: string;
    hint?: string;
}

/**
 * @internal
 * @param props
 * @constructor
 */
export function FormGroup(props: IFormGroup): React.ReactElement {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {props.children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}
