import {ChangeEvent, default as React, ReactElement, useContext, useEffect, useState} from "react";
import {shouldShowValidation} from "../_src/_helpers";
import {FormType, IFormElementMeta, IFormElementValidators} from "../_src/form";
import {updateStateFromPassedInContext} from "./_helpers";

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
    /** Optional */
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
    updateParentState: (e: any) => void;
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
 *    <InputText value={this.state.message} state={this.state} />
 *      <FormConsumer>
 *      {(context: any) => {
 *          return <div>{context} is equal {myState}</div>;
 *      }}
 *    </FormConsumer>
 * </Form>
 * ```
 * */
export const FormConsumer = FormContext.Consumer;


export const handleChange = (e: ChangeEvent<any>) => {
    // this.setState({myForm1: {
    //         message: e.target.value,
    //     }})
};

export const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
};

/**
 *
 * @param props
 * @constructor
 */
export const Button = (props: any) => {
    return <button type="submit">Submit</button>;
};

export const InputText = (props: any) => {
    const [state, setState] = useState(props.state);
    return (
        <FormConsumer>
            {(context: any) => {
                return (<input
                    type="text"
                    value={context.message}
                    onChange={context.updateState}
                />);
            }}
        </FormConsumer>

    );
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
    const [state, setState] = useState(props.state);

    // If the parent component is a class component, then the state needs to be updated from the parent context
    if(props.context) {
        useEffect(() => {
            props.context.setState({
                ...state,
            });
        }, [state]);
    }

    const providerContext: IFormContext = {
        bare: props.bare || false,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || false,
        dynamic: props.dynamic || true,
        metadata: {},
        updateParentState: updateStateFromPassedInContext(state, setState),
    };

    return (
        <FormProvider value={providerContext}>
            <form onSubmit={handleSubmit}>{props.children}</form>
        </FormProvider>

    )
};
