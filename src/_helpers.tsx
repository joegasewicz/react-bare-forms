import * as React from "react";
import {ReactElement, useContext, useEffect} from "react";
import {FormContext, IFormContext} from "./form";
import {IValidation} from "./validators";


/**
 * @internal
 * @param props
 * @constructor
 */
export const FormElementValidators = (props: any): ReactElement => {
    const {validators = null, name, value = null}: any = props;
    const context: IFormContext = useContext(FormContext);
    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
    if(context.metadata.inputs) {
        // Collect validators results before updating context
        let validationResults: Array<IValidation> = [];
        validators.map((key: any, index: number) => {
            validationResults = [...validationResults , validators[index](context.state[name], context)];
        });

        useEffect(() => {
            context.updateFieldValidation(name, context.state[name], validationResults)
        }, [context.state]);

        if(context.metadata.inputs[name] && context.metadata.inputs[name].isTouched) {
            return (<>{validationResults.map((result: IValidation) =>
                result.messages.map((msg: string, index: number) =>
                    <div key={index} className={styles}>{msg}</div>
                ))}</>);
        } else {
            return null;
        }
    }
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
