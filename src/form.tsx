import {default as React, useEffect, useState} from "react";
import {updateRadioGroupStateFromPassedInContext, updateStateFromPassedInContext} from "./_handlers";
import {IValidation} from "./validators";
import {updateRadioGroupMetadata, updateValidationMetadata} from "./_context_updaters";
import {IFileField, IRadioField} from "./elements";
import {getFileFromRef} from "./uncrontrolled";

/** @internal */
export interface IRadioGroupChildren {
    name: string;
    isChecked: boolean;
    disabled: boolean; // TODO
}
/** @internal */
export interface IInputFieldMetadata {
    messages: Array<string>;
    isValid: boolean;
    isTouched: boolean;
    value: any;
    validation: Array<IValidation>;
}
/** @internal */
export interface IFileMetaData {
    messages: Array<string>;
    isValid: boolean;
    isTouched: boolean;
    validation: Array<IValidation>;
    refName: string;
}
/** @internal */
export type TypeInputMetadata = { [k: string]: IInputFieldMetadata};
/** @internal */
export type TypeRadioGroup = {[k: string]: IRadioGroupChildren};
/** @internal */
export type TypeFileMetadata = {[k: string]: IFileMetaData};
/** @internal */
export interface IMetadata {
    fieldGroups: TypeRadioGroup;
    inputs: TypeInputMetadata;
    files: TypeFileMetadata;
}
/** @internal **/
export type TypeMetadataNames = "inputs"|"fieldGroups"|"files";
/** @internal **/
export type TypeMetadataTypes = TypeRadioGroup|TypeInputMetadata|TypeFileMetadata;
/** @internal **/
export type TypeFieldNames = "text"|"email"|"password"|"textArea"|"radio"|"checkbox"|"select"|"file";
/**
 * @interface **IForm** Exported Form interface available to the caller. Contains all the properties required by
 * the Form *RBF* Form's component.
 */
export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
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
    /** Callback function wil be called on form submission if all validators pass */
    callback?: Function;
}
/** @internal */
export interface IFormContext {
    bare?: boolean;
    debug?: boolean;
    dynamic?: boolean;
    formKey?: string;
    metadata: IMetadata;
    state: any;
    updateParentState?: (e: React.ChangeEvent<any>, name: string) => void;
    updateRadioGroupStateFromPassedInContext?: (e: React.ChangeEvent<any>, name: string, radioGroup: any) => void;
    updateFieldValidation?: (fieldName: string, fieldValue: any, validation: Array<IValidation>) => void;
    updateRadioGroupMetadata?: (fieldGroupKey: string, radioProps: Array<{ props: IRadioField}>) => void;
}

/** @internal */
const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null,
    debug: false,
    dynamic: true,
    metadata: {
        inputs: {},
        fieldGroups: {},
        files: {},
    },
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

/** @internal */
export const handleSubmit = (props: IForm) =>
    (e: React.ChangeEvent<any>) => {
        e.preventDefault();
        const { callback, } = props;
        for (let elem of props.children) {
            console.log(elem)
            if(elem.ref && !(getFileFromRef(elem.ref) instanceof File)) {
                console.log("NO FILE!")
                // TODO run validator
            }
        }
        if(typeof callback === "function" && callback()) {
            callback();
        } else {
            // TODO throw error
        }

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
    const [context, updateContext] = useState(providerContext);
    const _providerContext: IFormContext = {
        bare: props.bare || context.bare,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || context.debug,
        dynamic: props.dynamic || context.dynamic,
        metadata: context.metadata,
        updateParentState: updateStateFromPassedInContext(parentState, setParentState),
        updateRadioGroupStateFromPassedInContext: updateRadioGroupStateFromPassedInContext(parentState, setParentState),
        updateFieldValidation: updateValidationMetadata(context, updateContext),
        updateRadioGroupMetadata: updateRadioGroupMetadata(context, updateContext),
    };
    return (
        <FormProvider value={_providerContext}>
            <form onSubmit={handleSubmit(props)} {...props}>{props.children}</form>
        </FormProvider>
    );
};
