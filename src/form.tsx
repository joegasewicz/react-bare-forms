import {default as React, Provider, useEffect, useState} from "react";
import {updateRadioGroupStateFromPassedInContext, updateParentState} from "./core/_handlers";
import {IValidation} from "./validators";
// import {updateMetadata} from "./core/_context_updaters";
import {IRadioField, ITextInputField} from "./elements";
import {getFileFromRef} from "./uncrontrolled";
import {AbstractMetadata, Metadata} from "./core/services/_metadata";

export interface IFieldValues {
    currentValue: any;
    readonly type: "value"|"checked"|"file";
}
/** @internal */
export interface IFieldValidation {
    readonly name: string;
    validation: Array<IValidation>;
    fieldValues: IFieldValues;
    isTouched: boolean;
}
/** @internal */
export interface IInputFieldMetadata extends IFieldValidation {}
/** @internal */
export interface IFileMetaData extends IFieldValidation {
    // readonly refName: string;
}
/** @internal */
export interface IRadioGroupChildren extends IFieldValidation {
    // readonly parent: string;
}
/** @internal */
export interface ICheckBoxesMetadata extends IFieldValidation {}
/** @internal */
export type TypeIFieldMetadata =
    | IInputFieldMetadata
    | IFileMetaData
    | IRadioGroupChildren
    | ICheckBoxesMetadata;
/** @internal */
export type TypeInputMetadata = AbstractMetadata<IInputFieldMetadata>;
/** @internal */
export type TypeFileMetadata = AbstractMetadata<TypeFormMetadata>;
/** @internal */
export type TypeRadioGroupMetadata = AbstractMetadata<TypeFormMetadata>;
/** @internal */
export type TypeCheckboxesMetadata = AbstractMetadata<TypeFormMetadata>;
/** @internal */
export type TypeFormMetadata =
    | TypeInputMetadata
    | TypeRadioGroupMetadata
    | TypeFileMetadata
    | TypeCheckboxesMetadata;
/** @internal **/
export type TypeMetadataNames =
    | "inputs"
    | "radioGroups"
    | "files"
    | "checkboxes";
/** @internal */
export interface IMetadata {
    // radioGroups: TypeRadioGroupMetadata;
    inputs: TypeInputMetadata;
    // files: TypeInputMetadata;
    // checkboxes: TypeCheckboxesMetadata;
}
/** @internal **/
export enum METADATA_NAMES {
    INPUTS = "inputs",
    // RADIO_GROUPS = "radioGroups",
    // FILES = "files",
    // CHECKBOXES = "checkboxes",
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
    //updateMetadata?: (fieldName: string, fieldValue: any, validation: Array<IValidation>, type?: TypeMetadataNames) => void;
    // inputsMetadata?: AbstractMetadata<TypeInputMetadata>;
}
/** @internal */
const INPUTS_STATE = {};
/** @internal */
// const RADIO_GROUPS_STATE: TypeRadioGroupMetadata = {};
/** @internal */
// const FILES_STATE: TypeFileMetadata = {};
/** @internal */
// const CHECKBOXES_STATE: TypeCheckboxesMetadata = {};
/** @internal */
const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null,
    debug: false,
    dynamic: true,
    metadata: {
        inputs: null,
        // radioGroups: null,
        // files: null,
        // checkboxes: null,
    },
};
/** @internal */
export interface IRadioGroupParentContext {
    parent?: { name: string };
    children?: any;
}
/** @internal */
// export const RadioGroupContext = React.createContext<TypeRadioGroupMetadata>(RADIO_GROUPS_STATE);
/** @internal */
export const FormContext = React.createContext<IFormContext>(providerContext);
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

    const [inputState, updateInputState] = useState(INPUTS_STATE);


    const _providerContext: IFormContext = {
        bare: props.bare || context.bare,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || context.debug,
        dynamic: props.dynamic || context.dynamic,
        updateParentState: updateParentState(parentState, setParentState),
        //updateMetadata: updateMetadata(context, updateContext),
        metadata: {
            [METADATA_NAMES.INPUTS]: new Metadata<IInputFieldMetadata>(inputState, updateInputState, METADATA_NAMES.INPUTS)
        },
    };
    
    return (
        <FormProvider value={_providerContext}>
            <form onSubmit={handleSubmit(props)} {...props}>{props.children}</form>
        </FormProvider>
    );
};
