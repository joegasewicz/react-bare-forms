import {default as React, Provider, useEffect, useState} from "react";
import {updateRadioGroupStateFromPassedInContext, updateParentState} from "./core/_handlers";
import {IValidation} from "./validators";
// import {updateMetadata} from "./core/_context_updaters";
import {IRadioField, ITextInputField} from "./elements";
import {getFileFromRef} from "./uncrontrolled";
import {AbstractMetadata} from "./classes/_AbstractMetadata";
import {Metadata} from "./classes/_Metadata";
import {MetadataFile} from "./classes/_MetadataFile";
import {MetadataGroup} from "./classes/_MetadataGroup";



/** @internal */
export type TypeFieldValueTypes = "value"|"checked"|"file";
/** @internal */
export interface IFieldValues {
    currentValue: any;
    readonly type: TypeFieldValueTypes;
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
    readonly refName: string;
}
/** @internal */
export interface IRadioGroupChildren extends IFieldValidation {}
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
export type TypeFileMetadata = AbstractMetadata<IFileMetaData>;
/** @internal */
export type TypeRadioGroupMetadata = AbstractMetadata<IRadioGroupChildren>;
/** @internal */
export type TypeCheckboxesMetadata = AbstractMetadata<ICheckBoxesMetadata>;
/** @internal */
export type TypeFormMetadata =
    | TypeInputMetadata
    | TypeRadioGroupMetadata
    | TypeCheckboxesMetadata
    | TypeFileMetadata;
/** @internal */
export interface IMetadata {
    radioGroups: TypeRadioGroupMetadata;
    inputs: TypeInputMetadata;
    files: TypeInputMetadata;
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
    /** The passed in state from the parentName component */
    state: any;
    /** If the parentName component is a class component then the context must contain the parentName's **this** keyword. */
    context?: any;
    /** If the form's state is not directly contained at parentName's state root object, then formKey needs to represent the key. */
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
}
/** @internal */
const INPUTS_STATE: TypeInputMetadata = {} as any;
/** @internal */
const RADIO_GROUPS_STATE: TypeRadioGroupMetadata = {} as any;
/** @internal */
const FILES_STATE: TypeFileMetadata = {} as any;
/** @internal */
const CHECKBOXES_STATE: TypeCheckboxesMetadata = {} as any;
/** @internal */
const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null as any,
    debug: false,
    dynamic: true,
    metadata: {
        inputs: null as any,
        radioGroups: null as any,
        files: null as any,
        checkboxes: null as any,
    },
};
/** @internal */
export interface IRadioGroupParentContext {
    parent?: { name: string };
    children?: any;
}
/** @internal */
export const RadioGroupContext = React.createContext<TypeRadioGroupMetadata>(RADIO_GROUPS_STATE);
/** @internal */
export const FormContext = React.createContext<IFormContext>(providerContext);
/** @internal */
export const FormProvider = FormContext.Provider;
/**
 * @var Access the form state within a React Context Api Consumer scope
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

            if(elem.ref && !(getFileFromRef(elem.ref) instanceof File)) {

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
    // If the parentName component is a class component, then the state needs to be updated from the parentName context
    if(props.context) {
        useEffect(() => {
            props.context.setState({
                ...parentState,
            });
        }, [parentState]);
    }
    // State Hooks
    const [context, _] = useState(providerContext);
    const [inputState, updateInputState] = useState(INPUTS_STATE);
    const [checkboxesState, updateCheckboxesState] = useState(CHECKBOXES_STATE);
    const [fileState, updateFileState] = useState(FILES_STATE);
    const [radioState, updateRadioState] = useState(RADIO_GROUPS_STATE);


    const _providerContext: IFormContext = {
        bare: props.bare || context.bare,
        state: props.state,
        formKey: props.formKey,
        debug: props.debug || context.debug,
        dynamic: props.dynamic || context.dynamic,
        updateParentState: updateParentState(parentState, setParentState),
        updateRadioGroupStateFromPassedInContext: updateRadioGroupStateFromPassedInContext(parentState, setParentState),
        metadata: {
            [METADATA_NAMES.INPUTS]: new Metadata<IInputFieldMetadata>(
                inputState as {},
                updateInputState,
                METADATA_NAMES.INPUTS,
            ),
            [METADATA_NAMES.CHECKBOXES]: new Metadata<ICheckBoxesMetadata>(
                checkboxesState as {},
                updateCheckboxesState,
                METADATA_NAMES.CHECKBOXES,
            ),
            [METADATA_NAMES.FILES]: new MetadataFile<IFileMetaData>(
                fileState as {},
                updateFileState,
                METADATA_NAMES.FILES,
            ),
            [METADATA_NAMES.RADIO_GROUPS]: new MetadataGroup<IRadioGroupChildren>(
                radioState as any,
                updateRadioState,
                METADATA_NAMES.RADIO_GROUPS,
            ),
        },
    };

    return (
            <FormProvider value={_providerContext}>
            <form onSubmit={handleSubmit(props)} {...props}>{props.children}</form>
        </FormProvider>
    );
};
