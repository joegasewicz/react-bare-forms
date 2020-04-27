import {ChangeEvent, default as React, useContext, useEffect, useState} from "react";
import {updateStateFromPassedInContext} from "./_handlers";
import {IValidation} from "./validators";



/** @internal */
export interface _IFormMetadata {
    messages: Array<string>;
    isValid: boolean;
    isTouched: boolean;
    value: any;
}

/** @internal */
export type TypeMetadata = { [k: string]: _IFormMetadata};

/**
 * @interface **IForm** Exported Form interface available to the caller. Contains all the properties required by
 * the Form *RBF* Form's component.
 */
export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> { // TODO check this is correct
    /** The passed in state from the parent component */
    state: any;
    /** If the parent component is a class component then the context must contain the parent's **this** keyword. */
    context?: any;
    /** If the form's state is not directly contained at parent's state root object, then formKey needs to represent the key. */
    formKey?: string;
    /** Default is false. If set to true then the form state will be displayed just below the form component in `code` tags. */
    debug?: boolean;
    /** Default is True. If set to false, the  validators will not be called until the form is submitted. */
    dynamic?: boolean;
    /** The passed through props to the Form component */
    children?: any;
    /** Default set to false. If set to true then it will now use bootstrap styling or any extra elements. */
    bare?: boolean;
}

/** @internal */
export interface IFormContext {
    bare?: boolean;
    debug?: boolean;
    dynamic?: boolean;
    formKey?: string;
    metadata: TypeMetadata;
    state: any;
    updateParentState?: (e: React.ChangeEvent<any>, name: string) => void;
    updateFieldValidation?: (fieldName: string, fieldValue: any, validation: IValidation) => void;
}


const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null,
    debug: false,
    dynamic: true,
    metadata: {},
};

/** @internal */
export const FormContext = React.createContext(providerContext);
/** @internal */
export const FormProvider = FormContext.Provider;
/**
 * @var Access the form state within a React Conext Api Consumer scope
 * @example For example:
 * ```
 * <Form state={this.state} context={this}>
 *      <FormConsumer>
 *      {({state}) => {
 *          return <div>{state} is equal {myState}</div>;
 *      }}
 *    </FormConsumer>
 * </Form>
 * ```
 * */
export const FormConsumer = FormContext.Consumer;


export const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
};

/**
 *
 * @param props
 * @constructor
 */
export const Submit = (props: any) => {
    return <button type="submit">Submit</button>;
};


/**
 * The main Form component
 * @param props
 *
 * ```
 * // Minimal setup for a RBF's Form component
 *
 *  const myState = {
 *      username: '',
 *  }
 *
 *  <Form state={myState}></Form>
 * ```
 * @constructor
 */
export const Form = (props: IForm) => {
    const [parentState, setParentState] = useState(props.state);


    // If the parent component is a class component, then the state needs to be updated from the parent context
    if(props.context) {
        useEffect(() => {
            props.context.setState({
                ...parentState,
            });
        }, [parentState]);
    }

    const updateValidationMetadata = (context: any, update: any) =>
        (fieldName: string, fieldValue: any, validation: IValidation): void => {
            if(typeof context.metadata === "undefined") {
                return;
            }
            if(!(fieldName in context.metadata)) {
                update({
                    ...context,
                     metadata: {
                         ...context.metadata,
                         [fieldName]: {
                             ...validation,
                             value: fieldValue,
                             isTouched: true,
                         }
                     },
                });
                // Should update context.metadata value
            } else if(context.metadata[fieldName].value != fieldValue) {
                update({
                    ...context,
                    metadata: {
                        ...context.metadata,
                        [fieldName]: {
                            ...validation,
                            value: fieldValue,
                            isTouched: true,
                        }
                    },
                });
            }

        };


    const [context, updateContext] = useState(providerContext);
    const updateFieldValidation = updateValidationMetadata(context, updateContext);

    const _providerContext: IFormContext = {
        bare: props.bare || false,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || false,
        dynamic: props.dynamic || true,
        metadata: context.metadata,
        updateParentState: updateStateFromPassedInContext(parentState, setParentState),
    };


    return (
        <FormProvider value={{..._providerContext, updateFieldValidation}}>
            <form onSubmit={handleSubmit} {...props}>{props.children}</form>
        </FormProvider>
    );
};
