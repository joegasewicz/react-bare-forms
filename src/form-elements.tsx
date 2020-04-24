import {default as React} from "react";
import {FormConsumer} from "./form";
import {IValidators} from "./validators";



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
    validators?: Array<IValidators>
}

interface ITextInputField extends IField {
    className?: string;
}

/**
 *
 * @param props
 * ```
 * // A bare form example ... remember to set the {@link Form.bare} property to `true`
 * <TextInputField
 *    value={this.state.message}
 *    name="username"
 * />
 *
 * // Example with Bootstrap styling (Bootstrap styling comes as default)
 *
 * <TextInputField
 *    value={this.state.message}
 *    name="username"
 *    hint="Needs to be at least 50 characters long"
 *    labelText="Username"
 *  />
 * ```
 * @constructor
 */
export const TextInputField = (props: ITextInputField) => {
    return (
        <FormConsumer>
            {(context: any) => {
                const _input = <input
                    type="text"
                    value={context.message}
                    onChange={context.updateParentState}
                    name={props.name}
                    className={`form-control ${props.className}`}
                />;
                if(context.bare) {
                    return _input;
                } else {
                    return <FormGroup labelText={props.labelText} hint={props.hint} >{_input}</FormGroup>
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
function FormGroup(props: IFormGroup): React.ReactElement {
    return (
        <div className="form-group">
            {props.labelText && <label htmlFor="exampleInputEmail1">{props.labelText}</label>}
            {props.children}
            {props.hint && <small id="emailHelp" className="form-text text-muted">{props.hint}</small>}
        </div>
    )
}
