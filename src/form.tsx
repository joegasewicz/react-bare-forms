import {default as React, useEffect, useState} from "react";
import {updateRadioGroupStateFromPassedInContext, updateParentState, _FieldEmptyErrorMsg} from "./core";
import {IValidation} from "./validators";
import {
    AbstractMetadata,
    Metadata,
    MetadataFile,
    MetadataGroup,
} from "./field_classes";
import { _noContextError } from "./core/_errors";
import {updateCursorPosCallback, updateQueryResultsCallback} from "./core/_handlers";

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
export interface ICursorPositionState {
    cursorPosition: number;
    fieldName: string;
}
/** @internal */
export interface IQueryState {
    queryResults: Array<any>;
    showResults: boolean;
}
/** @internal */
export type TypeCursorPositionState = {[key: string]: ICursorPositionState};
/** @internal */
export type TypeQueryState = {[key: string]: IQueryState};

export interface IFormContext {
    readonly bare?: boolean;
    readonly debug?: boolean;
    readonly dynamic?: boolean;
    readonly formKey?: string;
    cursorPositions: TypeCursorPositionState;
    queryState: TypeQueryState;
    metadata: IMetadata;
    state: any;
    updateCursorPositionState: (fieldName: string, cursorPosition: number) => void;
    updateParentState?: (e: React.ChangeEvent<any>, name: string, formKey?: string) => void;
    updateRadioGroupStateFromPassedInContext?: (e: React.ChangeEvent<any>, name: string, radioGroup: any, formKey?: string) => void;
    updateQueryResultsState: (fieldName: string, showResults: boolean) => void;
}
/** @internal */
const INPUTS_STATE: TypeInputMetadata = {} as any;
/** @internal */
const RADIO_GROUPS_STATE: TypeRadioGroupMetadata = {} as any;
/** @internal */
const FILES_STATE: TypeFileMetadata = {} as any;
/** @internal */
const CHECKBOXES_STATE: TypeCheckboxesMetadata = {} as any;
/** @internal **/
const CURSOR_POSITION_STATE: TypeCursorPositionState = {};
/** @internal **/
const QUERY_STATE: TypeQueryState = {};
/** @internal */
const providerContext: IFormContext = {
    bare: false,
    state: {},
    formKey: null as any,
    debug: false,
    dynamic: true,
    cursorPositions: {},
    queryState: {},
    updateCursorPositionState: {} as any,
    updateQueryResultsState: {} as any,
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
        if(typeof callback === "function" && callback()) {
            callback();
        } else {
            // TODO throw error
        }
    };

/**
 * The main Form component that is required to wrap all *RBF* components.
 * If the component that uses the Form component is a functional component then
 * only the state props & state update function returned from the useState hook are
 * required. If you are calling Form component from a class component then you must 
 * pass your local context or `this` keyword to
 * the `context` prop.
 * @param props {@link IForm}
 *
 * An example using *RBF* Form component in a functional component
 * @example
 * ```
 * // Minimal setup for a RBF's Form component
 *
 *  const myState = {
 *      username: '',
 *  }
 *  const [state, setState] = React.useState(state);
 *  <Form state={myState} context={setState}></Form>
 * ```
 *
 * To use *RBF* Form component from a class component you must pass in your
 * local state of `this` keyword.
 * @example
 * ```
 * // Minimal setup for a RBF's Form component for a class component
 *
 *  this.state = { // in the constructor
 *      username: '',
 *  }
 *
 *  <Form state={this.state} context={this}></Form>
 * ```
 * @constructor
 */
export const Form = (props: IForm) => {
    const [parentState, setParentState] = useState(props.state);
    const [context, _] = useState(providerContext);
    const [inputState, updateInputState] = useState(INPUTS_STATE);
    const [checkboxesState, updateCheckboxesState] = useState(CHECKBOXES_STATE);
    const [fileState, updateFileState] = useState(FILES_STATE);
    const [radioState, updateRadioState] = useState(RADIO_GROUPS_STATE);
    const [cursorPositionState, updateCursorPositionState] = useState<TypeCursorPositionState>(CURSOR_POSITION_STATE);
    const [queryState, updateQueryState] = useState<TypeQueryState>(QUERY_STATE);
    // If the parentName component is a class component, then the state needs to be updated from the parentName context
    // Functions component must use useState hook. See https://joegasewicz.github.io/react-bare-forms/modules/_form_.html
    if(props.context && "setState" in props.context) {
        useEffect(() => {
            props.context.setState({
                ...parentState,
            });
        }, [parentState]);
    } else if (props.context) {
        useEffect(() => {
            props.context({
                ...parentState,
            });
        }, [parentState]);
    } else {
        throw new _FieldEmptyErrorMsg(_noContextError);
    }
    // State Hooks
    const _providerContext: IFormContext = {
        bare: props.bare || context.bare,
        state: props.state,
        formKey: props.formKey,
        cursorPositions: cursorPositionState,
        queryState: queryState,
        debug: props.debug || context.debug,
        dynamic: props.dynamic || context.dynamic,
        updateParentState: updateParentState(parentState, setParentState, props.formKey),
        updateRadioGroupStateFromPassedInContext: updateRadioGroupStateFromPassedInContext(parentState, setParentState, props.formKey),
        updateCursorPositionState: updateCursorPosCallback(cursorPositionState!, updateCursorPositionState),
        updateQueryResultsState: updateQueryResultsCallback(queryState, updateQueryState),
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
            <form onSubmit={handleSubmit(props)}>{props.children}</form>
        </FormProvider>
    );
};
