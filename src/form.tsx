import {ChangeEvent, default as React, useEffect, useState} from "react";
import {updateStateFromPassedInContext} from "./_handlers";


/** @internal */
export interface _IFormMetadata {
    messages: Array<string>;
    isValid: boolean;
    isTouched: boolean;
    value: any;
}

export type TypeMetadata = { [k: string]: _IFormMetadata};

/**
 * @interface **IForm** Exported Form interface available to the caller. Contains all the properties required by
 * the Form *RBF* Form's component.
 */
export interface IForm {
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
    updateParentState: (e: React.ChangeEvent<any>, name: string) => void;
}

/** @internal */
export const FormContext = React.createContext({});
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

    const providerContext: IFormContext = {
        bare: props.bare || false,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || false,
        dynamic: props.dynamic || true,
        metadata: {},
        updateParentState: updateStateFromPassedInContext(parentState, setParentState),
    };

    return (
        <FormProvider value={providerContext}>
            <form onSubmit={handleSubmit}>{props.children}</form>
        </FormProvider>

    )
};
