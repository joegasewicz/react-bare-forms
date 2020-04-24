import {default as React} from "react";
import {FormConsumer} from "./form";
import {IValidators} from "./validators";
import {FormElementValidators} from "./_helpers";



interface IField {
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

interface IConfirmPasswordField extends IField {
    /** This is the name of the password field you wish to match against. See {@link ConfirmPasswordField}. */
    match: string;
}

interface IEmailField extends IField {}

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
 * @params props
 */
export const PasswordField = (props: IPasswordField) =>
    _createTextInputField("password")(props);

/**
 * the prop of `match` is required. The `match` prop will make a direct comparison against
 * the {@link PasswordField} form element. If their values are equal then these 2 inputs fields
 * are valid.
 * @params props
 */
export const ConfirmPasswordField = (props: IConfirmPasswordField) =>
    _createTextInputField("password")(props);

/*
 * @param props
 */
export const EmailField = (props: IEmailField) =>
    _createTextInputField("email")(props);

/**
 * @internal
 * @param type
 * @private
 */
function _createTextInputField(type: string) {
    return (props: ITextInputField) => (
        <FormConsumer>
            {(context: any) => {
                const _input = <input
                    type={type}
                    value={context[props.name]}
                    onChange={(e) => context.updateParentState(e, props.name)}
                    name={props.name}
                    className={`form-control ${props.className}`}
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
                        <FormGroup labelText={props.labelText} hint={props.hint} >
                            {_input}
                            {_validate}
                        </FormGroup>
                    )
                }

            }}
        </FormConsumer>

    );
}

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
function FormGroup(props: IFormGroup): React.ReactElement {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {props.children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    )
}