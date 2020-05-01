import * as React from "react";
import {ReactElement} from "react";
import {FormConsumer} from "./form";


/**
 * @internal
 * @param props
 * @constructor
 */
export const FormElementValidators = (props: any): ReactElement => {
    const {validators = null, name}: any = props;
    return (
        <>
            <FormConsumer>
                {(context: any) => {
                    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
                    if(!context.state || !context.state[name]) {
                        return null;
                    }
                    return (
                        <>{validators.map((key: any, index: number) => {
                            const validationResult = validators[index](context.state[name], context);
                            setTimeout(() => context.updateFieldValidation(name, context.state[name], validationResult), 0);
                            return validationResult.messages.map((msg: string) => {
                                return <div key={index} className={styles}>{msg}</div>
                            });
                        })}</>
                    );
                }}
            </FormConsumer>
        </>
    );
};

/**
 * @internal
 * @param defaultValue
 * @param cssProps
 * @param bare
 */
export function mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string {
    let cssStr = "";
    if(!bare) {
        cssStr += `${defaultValue} `;
    }
    if (cssProps) {
        cssStr += `${cssProps}`;
    }
    return cssStr;
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
export function FormGroup(props: IFormGroup): React.ReactElement {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {props.children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}
