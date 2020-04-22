import * as React from "react";
import {FormElementValidators, FormContext, IFormContext, selectElement} from "./form";
import {Validators} from "./validators";

export type FieldTypes =
    | "text"
    | "submit"
    | "textarea"
    | "select"
    | "password"
    | "email"
    | "checkbox";

interface ISubmitProps {
    children: any;
    type: string;
}


interface IFormElementProps {
    name: any;
    label: string;
    type: FieldTypes;
    hint?: string;
    validators?: Validators;
}

/**
 *
 * @param props
 * @constructor
 */
export const Submit = (props: ISubmitProps): any => {
    return <FormContext.Consumer>
        {({setIsSubmitted}: IFormContext) => {
            return <button
                disabled={false}
                type="submit"
                onClick={() => setIsSubmitted()}
            >{props.children}</button>
        }}
    </FormContext.Consumer>
};



/**
 *
 * @param props
 * @constructor
 */
export const Field = (props: IFormElementProps) => {
    const {name, label, type, hint = "", validators = null} = props;
    return(
        <div className="form-group">
            {label && <label>{label}</label>}
            {hint && <small className="form-text text-muted">{hint}</small>}
            {selectElement(type, name)}
            {props.validators && <FormElementValidators validators={validators} name={name} />}
        </div>
    );
};
