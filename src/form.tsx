import * as React from "react";
import {ChangeEvent, ReactChildren, useState, createContext, useContext, ReactElement} from "react";
import {SyntheticEvent} from "react";
import {IValidation, Validators} from "./validators";
import {FieldTypes} from "./form-elements";
import {handleChange, handleSubmit} from "./handlers";

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

export interface IFormContext {
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

export const FormContext = createContext<IFormContext>(DEFAULT_FORM_STATE);

/**
 *
 * @param props
 * @constructor
 */
export const Form = (props: IFormContext) => {
    const startingState = {...DEFAULT_FORM_STATE, state: props.state, formKey: props.formKey, isSubmitted: false};
    const [currentState, updateState] = useState(startingState);

    const setIsSubmitted = (): void => { // TODO not updating on second mount
        updateState({
            ...currentState,
            isSubmitted: true,
        });
    };


    if(currentState === null) {
        // TODO use custom error
        throw Error("React-Bare-Forms: You must pass your React component state to Form");
    }
    const children = props.children || null;

    return (
        <FormContext.Provider value={{...currentState, setIsSubmitted}}>
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
                            console.log("valid -----> ", context.isSubmitted);
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

