import {default as React, useEffect, useState} from "react";
import {updateRadioGroupStateFromPassedInContext, updateStateFromPassedInContext} from "./core/_handlers";
import {IValidation} from "./validators";
import {updateValidationMetadata} from "./core/_context_updaters";
import {IRadioField} from "./elements";
import {getFileFromRef} from "./uncrontrolled";


/** @internal */
export interface IFieldValidation {
    validation: Array<IValidation>;
}
/** @internal */
export interface IInputFieldMetadata extends IFieldValidation {
    isTouched: boolean;
    value: any;
}
/** @internal */
export interface IFileMetaData extends IFieldValidation {
    isTouched: boolean;
    refName: string;
    file: File;
}
/** @internal */
export interface IRadioGroupChildren extends IFieldValidation {
    readonly name: string;
    isChecked: boolean;
    parent: string;
}
/** @internal */
export interface ICheckBoxesMetadata extends IFieldValidation {
    readonly name: string;
    isChecked: boolean;
    isTouched: boolean;
}
/** @internal **/
export type TypeMetadataNames = "inputs"|"radioGroups"|"files"|"checkboxes";
/** @internal */
export type TypeInputMetadata = { [k: string]: IInputFieldMetadata};
/** @internal */
export type TypeFileMetadata = {[k: string]: IFileMetaData};
/** @internal */
export type TypeRadioGroupMetadata = {[k: string]: IRadioGroupChildren};
/** @internal */
export type TypeCheckboxesMetadata = {[k: string]: ICheckBoxesMetadata};
/** @internal */
export interface IMetadata {
    radioGroups: TypeRadioGroupMetadata;
    inputs: TypeInputMetadata;
    files: TypeFileMetadata;
    checkboxes: TypeCheckboxesMetadata;
}
/** @internal **/
export enum METADATA_NAMES {
    INPUTS = "inputs",
    RADIO_GROUPS = "radioGroups",
    FILES = "files",
    CHECKBOXES = "checkboxes",
}
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
    readonly formKey?: string;
    /** Default is false. If set to true then the form state will be displayed just below the form component in `code` tags. */
    readonly debug?: boolean;
    /** Default is True. If set to false, the  validators will not be called until the form is submitted. */
    readonly dynamic?: boolean;
    /** The passed through props to the Form component */
    children?: any;
    /** Default set to false. If set to true then it will now use bootstrap styling or any extra elements. */
    readonly bare?: boolean;
    /** Callback function wil be called on form submission if all validators pass */
    readonly callback?: Function;
}
/** @internal */
export interface IFormContext {
    readonly bare?: boolean;
    readonly debug?: boolean;
    readonly dynamic?: boolean;
    readonly formKey?: string;
    metadata: IMetadata;
    state: any;
    updateParentState?: (e: React.ChangeEvent<any>, name: string) => void;
    updateRadioGroupStateFromPassedInContext?: (e: React.ChangeEvent<any>, name: string, radioGroup: any) => void;
    updateFieldValidation?: (fieldName: string, fieldValue: any, validation: Array<IValidation>, type?: TypeMetadataNames) => void;
    updateRadioGroupMetadata?: (fieldGroupKey: string, radioProps: Array<{ props: IRadioField}>) => void;
}
/** @internal */
const INPUTS_STATE: TypeInputMetadata = {};
/** @internal */
const RADIO_GROUPS_STATE: TypeRadioGroupMetadata = {};
/** @internal */
const FILES_STATE: TypeFileMetadata = {};
/** @internal */
const CHECKBOXES_STATE: TypeCheckboxesMetadata = {};
/** @internal */
const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null,
    debug: false,
    dynamic: true,
    metadata: {
        inputs: INPUTS_STATE,
        radioGroups: RADIO_GROUPS_STATE,
        files: FILES_STATE,
        checkboxes: CHECKBOXES_STATE,
    },
};
/** @internal */
export interface IRadioGroupParentContext {
    parent?: { name: string };
    children?: any;
}
/** @internal */
export const InputsContext = React.createContext(INPUTS_STATE);
/** @internal */
export const CheckBoxesContext = React.createContext(CHECKBOXES_STATE);
/** @internal */
export const FilesContext = React.createContext(FILES_STATE);
/** @internal */
export const RadioGroupContext = React.createContext(RADIO_GROUPS_STATE);

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

    const [inputContext, updateInputContext] = useState(INPUTS_STATE);
    const [filesContext, updateFilesContext] = useState(FILES_STATE);
    const [radioGroupsContext, updateRadioGroupsContext] = useState(RADIO_GROUPS_STATE);
    const [checkboxesContext, updateCheckboxes] = useState(CHECKBOXES_STATE);

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
    };
    
    return (
        <FormProvider value={_providerContext}>
            <form onSubmit={handleSubmit(props)} {...props}>{props.children}</form>
        </FormProvider>
    );
};
