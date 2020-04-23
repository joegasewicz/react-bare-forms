import * as React from "react";
import {ChangeEvent, ReactChildren, useState, createContext, useContext, ReactElement} from "react";
import {SyntheticEvent} from "react";
import {IValidation, Validators} from "./validators";
import {FieldTypes} from "./form-elements";
import {handleChange, handleSubmit} from "./handlers";
import {setFormData, setIsSubmitted, shouldShowValidation} from "./_helpers";

// ------------------------------------------------------
// TYPES

export type FormType =
    |HTMLTextAreaElement
    |HTMLInputElement
    |HTMLButtonElement;
export type IReactState = {};
export type FormState<T> = { [K in keyof T]: T[K] };
export interface IFormState {
    children: any;
    formKey: string;
    state: {};
}

export interface IFormElementValidators {
    validators: Validators;
    name: any;
}

export interface IFormElementMeta {
    value: any;
    isTouched: boolean;
}

export interface IFormContext {
    // The state that the caller passes into the Form component
    state?: any;
    // Metadata used to track each form element such as events .etc
    formMetaData?: { [k: string]: IFormElementMeta };
    children?: any;
    // The name of the nested form data key on the state object
    formKey: string;
    // Set when the caller clicks on the Submit component
    isSubmitted?: boolean;
    // Method used to update the isSubmitted state on the form context
    setIsSubmitted?: () => void,
    // Method used to update both the current state & formMetaData.
    setFormData?: (name: any, e: ChangeEvent<FormType>) => void;
    // Object that describes all the validation errors when the user clicks submit.
    formErrors?: Array<string>;
    // Whether to show validation errors in real-time or after the caller clicks on the Submit Component
    dynamic?: boolean;
}

// ------------------------------------------------------
// CONTEXT
const DEFAULT_FORM_STATE: any = {
    formKey: null,
    state: null,
    isSubmitted: false,
    formErrors: null,
    setIsSubmitted: () => {},
    setFormData: (name: any, e: ChangeEvent<FormType>) => {},
    dynamic: false,
};

export const FormContext = createContext<IFormContext>(DEFAULT_FORM_STATE);

/**
 *
 * @param props
 * @constructor
 */
export const Form = (props: IFormContext) => {
    const startingState = {
        ...DEFAULT_FORM_STATE,
        state: props.state,
        formKey: props.formKey,
        isSubmitted: false,
        dynamic: props.dynamic || false,
    };
    const [currentState, updateState] = useState(startingState);

    if(currentState === null) {
        // TODO use custom error
        throw Error("React-Bare-Forms: You must pass your React component state to Form");
    }
    const children = props.children || null;

    return (
        <FormContext.Provider value={{...currentState, setIsSubmitted: setIsSubmitted(updateState, currentState), setFormData: setFormData(updateState, currentState)}}>
            <FormContext.Consumer>
                {(context: IFormContext) => (
                    <form onSubmit={(e: SyntheticEvent) => handleSubmit(e, context, updateState)}>
                        {children}
                    </form>
                )}
            </FormContext.Consumer>
        </FormContext.Provider>
    );
};

/**
 *
 * @param props
 * @constructor
 */
export const FormElementValidators = (props: IFormElementValidators): ReactElement => {
    const {validators = null, name}: IFormElementValidators = props;
    return (
        <FormContext.Consumer>
            {(context: IFormContext) => {
                const formState = context.state[context.formKey];
                return (
                    <>{formState &&
                    context.formMetaData &&
                    Array.isArray(validators) &&
                    validators.map((_, index: number) => {
                        const validationResult = validators[index](formState[name]);
                        if(shouldShowValidation(validationResult, context, name)) {
                            return validationResult.messages.map((msg: string) =>
                                <div className="alert alert-danger">{msg}</div>);
                        }
                    })}</>
                );
            }}
        </FormContext.Consumer>
    );
};

