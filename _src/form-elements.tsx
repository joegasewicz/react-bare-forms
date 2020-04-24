import * as React from "react";
import {FormElementValidators, FormContext, IFormContext} from "./form";
import {Validators} from "./validators";
import {selectTextField} from "./_helpers";
import {handleChange} from "./handlers";

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
    type?: string;
}


interface IFormElementProps {
    name: any;
    label: string;
    type?: FieldTypes;
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
                className="btn btn-primary"
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
        <FormContext.Consumer>
            {(context: IFormContext) => (
                <div className="form-group">
                    {label && <label>{label}</label>}
                    {hint && <small className="form-text text-muted">{hint}</small>}
                    {selectTextField(type, name, context)}
                    {props.validators && <FormElementValidators validators={validators} name={name} />}
                </div>
                )
            }
        </FormContext.Consumer>

    );
};

export const TextArea = (props: IFormElementProps) => {
    const {name, label, type, hint = "", validators = null} = props;
    return(
        <div className="form-group">
            {label && <label>{label}</label>}
            {hint && <small className="form-text text-muted">{hint}</small>}
            {/*<textarea className="form-control" rows={10}  onChange={handleChange(name)} />;*/}
            {props.validators && <FormElementValidators validators={validators} name={name} />}
        </div>
    );
};

export const Select = (props: IFormElementProps) => {
    const {name, label, type, hint = "", validators = null} = props;
    return(
        <div className="form-group">
            {label && <label>{label}</label>}
            {hint && <small className="form-text text-muted">{hint}</small>}
            {/*{selectTextField(type, name)}*/}
            {props.validators && <FormElementValidators validators={validators} name={name} />}
        </div>
    );
};




// return <div className="form-group">
//             //     <label>Instrument</label>
//             //     <select className="form-control">
//             //     {JSON.stringify(this.props.instruments)}
//             // {this.props.instruments && this.props.instruments.length ?
//             //     this.props.instruments.map((instr: IInstruments) =>
//             //         <option value={instr.instr_id}>{instr.name}</option>)
//             //     : null}
//             // </select>
//             // </div>;
