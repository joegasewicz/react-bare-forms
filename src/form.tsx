import * as React from "react";
import {ChangeEvent, ReactChildren, useState, createContext, useContext, ReactElement} from "react";
import {SyntheticEvent} from "react";
import {IValidation} from "./validators";

// ------------------------------------------------------
// TYPES
type FormType =
    |HTMLTextAreaElement
    |HTMLInputElement
    |HTMLButtonElement;
type IReactState = {};
type FormState<T> = { [K in keyof T]: T[K] };
type FieldTypes =
    | "text"
    | "submit"
    | "textarea"
    | "select"
    | "password"
    | "email"
    | "checkbox";

type Validators = Array<(...args: Array<any>) => IValidation>;
interface IFormState {
    children: any;
    formKey: string;
    state: {};
}
interface ISubmitProps {
    children: any;
    type: string;
}
interface IFormControlProps {
    name: any;
    label: string;
    type: FieldTypes;
    hint?: string;
    validators?: Validators
}
interface IFormContext {
    state?: any;
    children?: any;
    formKey?: string;
    isSubmitted?: boolean;
    setIsSubmitted?: () => void,
    formErrors?: Array<string>;
}

// ------------------------------------------------------
// CONTEXT
const DEFAULT_FORM_STATE: any = {
    formKey: null,
    state: null,
    isSubmitted: false,
    formErrors: null,
    setIsSubmitted: () => {},
};

const FormContext = createContext<IFormContext>(DEFAULT_FORM_STATE);

/**
 *
 * @param props
 * @constructor
 */
export const Form = (props: IFormContext) => {
    const startingState = {...DEFAULT_FORM_STATE, state: props.state, formKey: props.formKey, isSubmitted: false};
    const [currentState, updateState] = useState(startingState);
    if(currentState === null) {
        // TODO use custom error
        throw Error("React-Bare-Forms: You must pass your React component state to Form");
    }
    const children = props.children || null;

    const setIsSubmitted = (): void => {
        updateState({
            ...currentState,
            isSubmitted: true,
        });
    };

    return (
        <FormContext.Provider value={{...currentState, setIsSubmitted}}>

    <FormContext.Consumer>
        {(context: IFormContext) => (
        <form
            onSubmit={(e: SyntheticEvent) => handleSubmit(e, context, updateState)}
>
    {children}
    </form>
)}
    </FormContext.Consumer>

    </FormContext.Provider>
);
};

/**
 *
 * @param name
 */
const handleChange = <T, K extends keyof IFormState>(name: K) => {
    const currentState: any = useContext(FormContext);
    const [_, updateState] = useState(currentState);
    if(currentState) {
        return (e: ChangeEvent<FormType>): void => {
            updateState({
                ...currentState,
                formData: {
                    ...currentState[name],
                    [name]: (e.target.value as any)
                } as FormState<IFormState>
            });
        }
    }
};


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
 * @param validators
 * @param name
 */
const ControlValidators = (props: any): ReactElement => {
    const {validators = null, name}: {validators: Validators, name: any} = props;
    return (
        <FormContext.Consumer>
            {(context: IFormContext) => {
        if(!context.state) {
            return null;
        }
        const formState = context.state[context.formKey];

        if(!formState) {
            return null;
        }

        if(validators && Array.isArray(validators) && validators.length) {
            return (
                <>{validators.map((_, index: number) => {
                        const validationResult = validators[index](formState[name]);
                        if(!validationResult.isValid && context.isSubmitted) {
                            return validationResult.messages.map((msg: string) =>
                                <div className="alert alert-danger">{msg}</div>);
                        }
                    })}</>
            );

        } else {
            return null;
        }

    }}
    </FormContext.Consumer>
);
};

// -------------------------------------------
// Controls
/**
 *
 * @param fieldType
 * @param name
 */
const selectElement = (fieldType: FieldTypes, name: any) => {
    switch(fieldType) {
        case "text": {
            return <textarea className="form-control" rows={10}  onChange={handleChange(name)} />;
        }
        case "email": {
            return <input type="text" className="form-control"/>;
        }
        case "password": {
            return <input type="text" className="form-control"/>;
        }
        case "textarea": {
            return <textarea className="form-control" rows={10}  onChange={handleChange(name)} />;
        }
        case "select": {
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
            return <></>;
        }
        case "checkbox": {
            return <></>;
        }
        default: {
            return <input type="text" className="form-control"/>;
        }
    }
};

/**
 *
 * @param props
 * @constructor
 */
export const Field = (props: IFormControlProps) => {
    const {name, label, type, hint = "", validators = null} = props;
    return(
        <div className="form-group">
            {label && <label>{label}</label>}
    {hint && <small className="form-text text-muted">{hint}</small>}
        {selectElement(type, name)}
        {props.validators && <ControlValidators validators={validators} name={name} />}
        </div>
    );
};


function handleSubmit(e: SyntheticEvent, localState: IFormContext, updateState: any) {
    e.preventDefault();
    let currentErrors: Array<string> = [];

    if(localState.formKey && localState.state) {
        const formData = localState.state[localState.formKey];

        if (formData) {
            Object.keys(formData).map((key) => {

                if(!formData[key] || formData[key] === "") {
                    const currentError = `Missing ${key} details.`;
                    currentErrors = [...currentErrors, currentError];
                    updateState({
                        ...localState,
                        formErrors: currentErrors,
                    });
                }
            });

            if(currentErrors.length) {
                alert("ERRORS!")
            } else {
                alert("Submitted Success!");
            }
        }
    }

}
